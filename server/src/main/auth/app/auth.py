from email.mime.multipart import MIMEMultipart
import os
from typing import Optional
from fastapi import Depends, FastAPI, HTTPException, Header, Security, status, APIRouter
from pydantic import BaseModel
import requests
from starlette.requests import Request
from starlette.responses import Response
from fastapi_permissions import configure_permissions, Allow, Deny, Authenticated, Everyone
import firebase_admin
import json
import boto3


import firebase_admin
from firebase_admin import credentials, auth
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext

from .mongodb import db
from .models import User, LoginUser, SignupOrganization, SignupUser, UserPermissions

from fastapi_permissions import (
    Allow,
    Authenticated,
    Deny,
    Everyone,
    configure_permissions,
    list_permissions,
)

# Define variables for Firebase Admin and security
security = HTTPBearer()
cred = credentials.Certificate("./src/main/auth/app/firebasekey.json")
app = FastAPI()

firebase_admin.initialize_app(cred)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Define OAuth2 scheme using Firebase Admin
async def has_access(credentials: HTTPAuthorizationCredentials = Security(security)):
    try:
        # Verify the token against Firebase Admin SDK and return the user ID
        decoded_token = auth.verify_id_token(credentials.credentials)
        user_id = decoded_token['uid']
        return {"message": "Access granted for ", "user_id": f"{user_id}"}
    except auth.InvalidIdTokenError:
        raise HTTPException(status_code=401, detail="Invalid ID token")


async def GetUserData(credentials: HTTPAuthorizationCredentials = Security(security)):
    id_token = credentials.credentials
    decoded_token = auth.verify_id_token(id_token)
    user_id = decoded_token['uid']
    user = await db['users'].find_one({"uid": user_id})
    return User.parse_obj(user)

def getActivePrincipals(user: User = Depends(GetUserData)):
    if user:
        # user is logged in
        principals = [Everyone, Authenticated]
        principals.extend(getattr(user, "principals", []))
    else:
        # user is not logged in
        principals = [Everyone]
    return principals
# Define dependencies

Permission = configure_permissions(getActivePrincipals)

def isAdmin(permission: UserPermissions = Permission("admin",UserPermissions)):
    return permission

def isMember(permission: UserPermissions = Permission("member",UserPermissions)):
    return permission

def isGuest(permission: UserPermissions = Permission("view",UserPermissions)):
    return permission

def isCompany(permission: UserPermissions = Permission("company",UserPermissions)):
    return permission


PROTECTED = [Depends(has_access)]
PROTECTED_RAW = Depends(has_access)
ADMIN = [Depends(isAdmin), PROTECTED_RAW]
MEMBER = [Depends(isMember),PROTECTED_RAW]
COMPANY = [Depends(isCompany),PROTECTED_RAW]
GUEST = [Depends(isGuest)]

router = APIRouter(prefix="/api/auth")

ses = boto3.client('ses', 
                          aws_access_key_id='AKIAZEUGRF2G4CNXZF6G', 
                          aws_secret_access_key='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', 
                          region_name='eu-north-1')

# Email data model
class EmailSchema(BaseModel):
    subject: str
    body: str
    sender: str
    recipient: str

def sign_in_with_email_and_password(email, password, return_secure_token=True):
    payload = json.dumps({"email":email, "password":password, "return_secure_token":return_secure_token})
    FIREBASE_WEB_API_KEY = 'AIzaSyDAf98ET4naiHNKMgn1o059JB5YVk0RDQI' 
    rest_api_url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"

    r = requests.post(rest_api_url,
                  params={"key": FIREBASE_WEB_API_KEY},
                  data=payload)

    return r.json()

# signup endpoint
@router.post("/signup")
async def Signup(body:SignupUser):
    name = body.name
    email = body.email
    password = body.password
    if name is None or email is None or password is None:
       return HTTPException(detail={'message': 'Error! Missing Fields'}, status_code=400)
    try:
        users = db['users']
        existing_user = await db['users'].find_one({"email": email})
        if existing_user:
            return HTTPException(detail={'message': 'User already exist'}, status_code=400)
        
        user = auth.create_user(
        email=email,
        password=password
        )
        body.uid = user.uid
        body.principals = ["role:member"]
        body_dict = body.dict()

        await users.insert_one(body_dict)
        response = ses.send_email(
            Source = "xfowth@gmail.com",
            # Source = email.sender,
            Destination={
                'ToAddresses': [
                    # email.recipient,
                    "xfowth@gmail.com"
                ],
            },
            Message={
                'Subject': {
                    'Data': "Successfull registration",
                },
                'Body': {
                    'Text': {
                        'Data': "You have successfully registered to the platform",
                    },
                }
            }
        )   
        return JSONResponse(content={'message': f'Successfully created user {user.uid}'}, status_code=200)    
    except:
        return HTTPException(detail={'message': 'Error Creating User'}, status_code=400) 

# signup endpoint
@router.post("/organization", dependencies=ADMIN)
async def SignupAsOrganization(body: SignupOrganization):
    email = body.email
    password = body.password
    address = body.address
    phone = body.phone
    city = body.city
    if email is None or password is None or address is None or phone is None or city is None:
       return HTTPException(detail={'message': 'Error! Missing Fields'}, status_code=400)
    try:
        users = db['organizations']
        existing_org = await users.find_one({"email": email})
        if existing_org:
            return HTTPException(detail={'message': 'Organization already exist'}, status_code=400)
        
        user = auth.create_user(
        email=email,
        password=password
        )
        body.uid = user.uid
        body.principals = ["role:company"]
        body_dict = body.dict()
        await users.insert_one(body_dict)
        return JSONResponse(content={'message': f'Successfully created user {"da"}'}, status_code=200)    
    except:
        return HTTPException(detail={'message': 'Error Creating Organization'}, status_code=400)

# login endpoint
@router.post("/login")
async def Login(body: LoginUser):
   email = body.email
   password = body.password
   try:
       user = sign_in_with_email_and_password(email, password)
       jwt = user['idToken']
       return JSONResponse(content={'token': jwt}, status_code=200)
   except:
       return HTTPException(detail={'message': 'There was an error logging in'}, status_code=400)

# Gets the user data from the token
@router.get('/googleuser', dependencies=PROTECTED)
async def GetUserId(credentials: HTTPAuthorizationCredentials = Security(security)):
    id_token = credentials.credentials
    user = auth.verify_id_token(id_token)
    return user


# Should be in Profile Service
@router.get('/user', dependencies=PROTECTED)
async def GetUser(credentials: HTTPAuthorizationCredentials = Security(security)):
    return await GetUserData(credentials)
# Should be in Profile Service


@router.get('/admin', dependencies=ADMIN)
async def AdminEndpoint():
    return "admin route"

@router.get('/protected', dependencies=PROTECTED)
async def PrivateEndpoint():
    return "protected route"

@router.get('/public')
async def PublicEndpoint():
    return "public route"
