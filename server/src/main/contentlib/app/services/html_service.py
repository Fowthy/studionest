from typing import List
from bson import ObjectId
from fastapi_security import logger
from ..mongodb import db


# # Gets all rooms from the database
# async def getAllRooms() -> List[Room] | None:
#     # Get the database and collection
#     collection = db['rooms']

#     # Get all the rooms from the database combining the backline
#     # $lookup aggregation is used to combine the backline (MongoDB equivalent of a join)
#     pipeline = [
#         {
#             '$lookup': {
#                 'from': 'backline', 
#                 'localField': 'backline', 
#                 'foreignField': '_id', 
#                 'as': 'backline'
#             }
#         }
#     ]
#     aggr = await collection.aggregate(pipeline).to_list(length=None)

#     # Results are converted to list of Room objects before returning
#     return[Room.parse_obj(room_dict) for room_dict in aggr]
