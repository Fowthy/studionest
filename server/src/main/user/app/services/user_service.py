from typing import List
from bson import ObjectId
from fastapi_security import logger
from ..models import User
from ..mongodb import db


# Gets all rooms from the database
async def getAllUsers() -> List[User] | None:
    # Get the database and collection
    collection = db['users']

    # Get all the users from the database
    users = await collection.find().to_list(length=None)

    # If no users are found, return None
    if not users:
        return None
    
    # Else return the users
    return [User.parse_obj(user) for user in users]


# Gets a room from the database by id
async def getUser(uid: str) -> User | None:
    collection = db["users"]

    user = await collection.find_one({"uid": uid})

    # If no user is found, return None
    if not user:
        return None
    
    # Else return the user
    return User.parse_obj(user)

# Gets a room from the database by id
async def deleteUser(uid: str) -> bool:
    collection = db["users"]

    # Find the user in the database by uid and delete it

    user = await collection.find_one_and_delete({"uid": uid})

    # If user is successfully deleted, return true
    if user:
        return True

    else :
        return False      


