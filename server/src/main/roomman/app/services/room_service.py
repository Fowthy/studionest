from json import loads
import os
from typing import List, Optional
from uuid import uuid4
from bson import ObjectId
from fastapi_security import logger
from src.main.roomman.app.models import Room
from src.main.roomman.app.mongodb import db
from src.main.shared.pika_client import PikaClientPublish
from fastapi import FastAPI, Form, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from botocore.exceptions import NoCredentialsError
from azure.storage.blob import BlobServiceClient
from azure.storage.blob import ContentSettings


pika_client = PikaClientPublish()


async def create_upload_file(name: str = Form(...), file: UploadFile = File(...)):
    if not file:
        return {"message": "No upload file sent"}
    else:
        storage_account_key = 'your-storage-account-secret-key'
        storage_account_name = 'studionestfiles'
        connection_string = 'DefaultEndpointsProtocol=https;AccountName=studionestfiles;AccountKey=u/Ud9gXMIETRDFLMwhhxgJzIu68xOpiTgIW7k26uMEZQ2VByeB0HP1OBX81QQkAdka3HPrxCz+7Y+AStDzeHOg==;EndpointSuffix=core.windows.net'
        container_name = 'rooms'   

        extension = os.path.splitext(file.filename)[1] if file.filename else ''   
        new_filename = f"{name}-{str(uuid4())}{extension}"  # Append UUID4 (random string) and extension
        content_settings = ContentSettings(content_type='image/jpeg')  # set content type
        blob_service_client = BlobServiceClient.from_connection_string(connection_string)
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=new_filename)

        try:
            contents = file.file.read()
            file.file.seek(0)
            blob_client.upload_blob(contents, content_settings=content_settings)
        except Exception:
            raise HTTPException(status_code=500, detail='Something went wrong')
        finally:
            file.file.close()
            return f"https://studionestfiles.blob.core.windows.net/rooms/{new_filename}"

# Creates a room in the database
async def createRoom(roomdata: str = Form(...), image: Optional[UploadFile] = None) -> Room | None:

    # Get the database and collection
    collection = db['rooms']

    room = Room.parse_obj(loads(roomdata))

    # Check if a room with the same name already exists
    # exists = await collection.find_one({"name": room.name})
    # if exists:
    #     raise Exception("Room with that name already exists")
    
    imageLink = ""
    if(image is None):
        # default image
        imageLink = "https://amplify-amplify7ba61ed5c67b4-staging-234108-deployment.s3.amazonaws.com/64771cf56a4fe492f9159f21-dc6c863d-89de-48c6-a18b-c8c01d24db5d.png"
    else:
        imageLink = await create_upload_file(str(room.id),image)

    room.img = imageLink;
    # Convert the Room object to a dictionary and insert it into the database
    dict = room.dict()
    result = await collection.insert_one(dict)
    print(dict)

    # Upload image to AWS S3
    # created = await collection.find_one({"_id": result.inserted_id})

    pipeline = [
        {
            '$match': {
                '_id': ObjectId(result.inserted_id)
            }
        }, {
            '$lookup': {
                'from': 'backline', 
                'localField': 'backline', 
                'foreignField': '_id', 
                'as': 'backline'
            }
        }
    ]
    

    aggr = collection.aggregate(pipeline)

    # Empty list to store the found rooms
    rooms_found = []

    # Iterate through the aggregation results and append them to the list
    # In this case the result should be either 0 or 1 rooms
    async for room in aggr:
        rooms_found.append(Room.parse_obj(room))

    # if the result_list is empty, return None
    if not rooms_found:
        raise Exception("Room not found")
    
    # Call rabbitmq function to create room in booking service
    # Send the message
    pika_client.publish('rooms', 'add_room', rooms_found[0])


    # else return the found room
    return Room.parse_obj(rooms_found[0])

# Delete all rooms
async def deleteAllRooms() -> None:
    collection = db['rooms']
    await collection.delete_many({})
    return True

# Gets all rooms from the database
async def getAllRooms() -> List[Room] | None:
    # Get the database and collection
    collection = db['rooms']
    print(os.environ.get('MONGODB'))


    # Get all the rooms from the database combining the backline
    # $lookup aggregation is used to combine the backline (MongoDB equivalent of a join)
    pipeline = [
        {
            '$lookup': {
                'from': 'backline', 
                'localField': 'backline', 
                'foreignField': '_id', 
                'as': 'backline'
            }
        }
    ]
    aggr = await collection.aggregate(pipeline).to_list(length=None)

    # Results are converted to list of Room objects before returning
    return[Room.parse_obj(room_dict) for room_dict in aggr]

# Updates a room in the database
async def updateRoom(id: str, updated: Room) -> Room | None:
    collection = db["rooms"]
    result = await collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": updated.dict(exclude_unset=True)}
    )
    if result.modified_count == 0:
        return None
    pika_client.publish('rooms', 'update_room', updated)
    
    pipeline = [
        {
            '$match': {
                '_id': ObjectId(id)
            }
        }, {
            '$lookup': {
                'from': 'backline', 
                'localField': 'backline', 
                'foreignField': '_id', 
                'as': 'backline'
            }
        }
    ]
    aggr = collection.aggregate(pipeline)

    # Empty list to store the found rooms
    rooms_found = []

    # Iterate through the aggregation results and append them to the list
    # In this case the result should be either 0 or 1 rooms
    async for room in aggr:
        rooms_found.append(Room.parse_obj(room))

    # if the result_list is empty, return None
    if not rooms_found:
        return None
    
    # else return the found room
    return Room.parse_obj(rooms_found[0])

# Gets a room from the database by id
async def getRoom(id: str) -> Room | None:
    collection = db["rooms"]

    # Get the room from the database combining the backline
    # $lookup aggregation is used to combine the backline (MongoDB equivalent of a join)
    pipeline = [
        {
            '$match': {
                '_id': ObjectId(id)
            }
        }, {
            '$lookup': {
                'from': 'backline', 
                'localField': 'backline', 
                'foreignField': '_id', 
                'as': 'backline'
            }
        }
    ]
    aggr = collection.aggregate(pipeline)

    # Empty list to store the found rooms
    rooms_found = []

    # Iterate through the aggregation results and append them to the list
    # In this case the result should be either 0 or 1 rooms
    async for room in aggr:
        rooms_found.append(Room.parse_obj(room))

    # if the result_list is empty, return None
    if not rooms_found:
        return None
    
    # else return the found room
    return Room.parse_obj(rooms_found[0])

# Deletes a room from the database by id
async def deleteRoom(id: str) -> bool:
    try:
        # Get the collection
        collection = db["rooms"]

        # Delete the room from the database and return true if the room was deleted
        result = await collection.delete_one({"_id": ObjectId(id)})
        pika_client.publish('rooms', 'delete_room', id)
        return True
    except:
        return False


