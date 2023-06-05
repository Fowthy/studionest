
from typing import List
from bson import ObjectId
from src.main.roomman.app.models import Backline, BacklineBody
from src.main.roomman.app.mongodb import db
from fastapi import FastAPI

# Creates a backline in the database
async def createBackline( backline: BacklineBody) -> Backline | None:
    # Get the database and collection
    collection = db['backline']

    # Check if a backline with the same name already exists
    exists = await collection.find_one({"name": backline.name})
    if exists:
        return None
    
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
