from typing import List
from bson import ObjectId
from fastapi_security import logger
from ..models import Room
from ..mongodb import db


# Gets all rooms from the database
async def getAllRooms() -> List[Room] | None:
    # Get the database and collection
    collection = db['rooms']

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


