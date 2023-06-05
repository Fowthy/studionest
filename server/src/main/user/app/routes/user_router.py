from fastapi import APIRouter, Depends, HTTPException, FastAPI, Header, Request, Response
from src.main.user.app.models import User
from src.main.user.app.services import user_service as userService
from ..schema import MessageSchema

router = APIRouter(prefix="/api/user")

# Get all users
@router.get("/users", status_code=200)
async def getUsers():
    users = await userService.getAllUsers()
    return users


# Get a user by id 
@router.get("/user/{uid}", status_code=200)
async def getUser(
    uid):
    if uid is None:
        raise HTTPException(status_code=400, detail="User id is required")
    
    user = await userService.getUser(uid)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# Delete a user by id 
@router.delete("/user/{uid}", status_code=200)
async def deleteUser(
    uid):
    if uid is None:
        raise HTTPException(status_code=400, detail="User id is required")
    
    user = await userService.deleteUser(uid)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
