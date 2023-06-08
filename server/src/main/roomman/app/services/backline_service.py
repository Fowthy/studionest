
from json import loads
import os
from typing import List
from uuid import uuid4
from bson import ObjectId
from typing import List, Optional
from src.main.roomman.app.models import Backline, BacklineBody
from src.main.roomman.app.mongodb import db
from fastapi import FastAPI, Form, UploadFile, File
import boto3
from botocore.exceptions import NoCredentialsError

async def upload_file(name: str, file: UploadFile = File(...)) -> str:
    try:
        s3 = boto3.client('s3', 
                          aws_access_key_id='AKIAZEUGRF2G4CNXZF6G', 
                          aws_secret_access_key='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', 
                          region_name='eu-north-1')
        
        extension = os.path.splitext(file.filename)[1] if file.filename else ''   
        new_filename = f"{name}-{str(uuid4())}{extension}"  # Append UUID4 (random string) and extension

        s3.upload_fileobj(Fileobj=file.file, Bucket='amplify-amplify7ba61ed5c67b4-staging-234108-deployment', Key=f'{new_filename}',ExtraArgs={'ACL': 'public-read'})
        
        print ("Upload Successful")
        bucket_name = 'amplify-amplify7ba61ed5c67b4-staging-234108-deployment'
        url = f"https://{bucket_name}.s3.amazonaws.com/{new_filename}"
        return url
        
    except NoCredentialsError:
        print ("Upload nnoo")
        return "No access credentials"


# Creates a backline in the database
async def createBackline( backlinedata: str = Form(...), image: Optional[UploadFile] = None) -> Backline | None:
    # Get the database and collection
    collection = db['backline']

    backline = Backline.parse_obj(loads(backlinedata))


    # Check if a backline with the same name already exists
    exists = await collection.find_one({"name": backline.name})
    if exists:
        return None
    
    imageLink = ""
    if(image is None):
        # default image
        imageLink = "https://amplify-amplify7ba61ed5c67b4-staging-234108-deployment.s3.amazonaws.com/64771cf56a4fe492f9159f21-dc6c863d-89de-48c6-a18b-c8c01d24db5d.png"
    else:
        imageLink = await upload_file(str(backline.id),image)
    
    backline.img = imageLink;
    
    # Convert the Backline object to a dictionary and insert it into the database
    dict = backline.dict()
    result = await collection.insert_one(dict)
    created = await collection.find_one({"_id": result.inserted_id})

    # Return the created backline
    return Backline.parse_obj(created)

# Gets all backlines from the database
async def getAllBackline() -> List[Backline] | None:
    # Get the database and collection
    collection = db['backline']

    # Find all backlines
    items = collection.find()

    # Convert and return all backlines
    return [Backline.parse_obj(item) async for item in items]

# Updates a backline in the database
async def updateBackline(id: str, updated: BacklineBody) -> Backline | None:
    collection = db["backline"]

    # Find the backline and update it
    result = await collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": updated.dict(exclude_unset=True)}
    )

    # If the backline was not found, return None
    if result.modified_count == 0:
        return None
    
    # Find the updated backline and return it
    updated = await collection.find_one({"_id": ObjectId(id)})
    return Backline.parse_obj(updated)

# Gets a bacline from the database by id
async def getBackline(id: str) -> Backline | None:
    collection = db["backline"]

    # Find the backline
    item = await collection.find_one({"_id": ObjectId(id)})

    # If the backline was not found, return None
    if item is None:
        return None
    
    # Else return the backline
    return Backline.parse_obj(item)

# Deletes a backline from the database
async def deleteBackline(id: str) -> bool:
    # Get the collection
    collection = db["backline"]

    # Delete the backline
    result = await collection.delete_one({"_id": ObjectId(id)})
    return result.deleted_count > 0
