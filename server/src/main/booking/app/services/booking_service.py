import asyncio
import datetime
import time
from typing import List
import json
import boto3
# from aio_pika import logger,connect, IncomingMessage
from bson import ObjectId,json_util
import logging
import pydantic
from src.main.booking.app.models import Booking, Room, User
from src.main.booking.app.mongodb import db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("uvicorn")

async def addRoom(message):
    try:
        collection = db['rooms']        
        room_dict = {key: value for key, value in message}
        print(message)

        logger.info(room_dict)
        room_dict['id'] = str(room_dict['id']['$oid'])
        await collection.insert_one(room_dict)
        logger.info("Room added")
        return message
    except Exception as e:
        logger.info(e)
        return None
async def deleteRoom(id):
    try:
        logger.info(id)
        collection = db['rooms']
        room = await collection.find_one({"id": id})
        logger.info(room["name"])
        result = await collection.delete_one({"id": id})
        logger.info("Room deleted")
        return id
    except Exception as e:
        logger.info(e)
        return None
async def updateRoom(message):
    try:
        collection = db['rooms']
        room_dict = {key: value for key, value in message}
        room_dict['id'] = str(room_dict['id']['$oid'])
        await collection.update_one({"id": room_dict['id']}, {"$set": room_dict})
        logger.info("Room updated")
        return message
    except Exception as e:
        logger.info(e)
        return None

async def getAvailableRooms():
    # Get all rooms from the database
    collection = db['rooms']
    rooms = await collection.find().to_list(length=1000)
    return[Room.parse_obj(x) for x in rooms]
# Creates a room in the database
async def addBooking(booking: Booking) -> Booking | None:
    # Get the database and collection
    try:
        collection = db['bookings']
        rooms = db['rooms']
        users = db['users']

        # Check if a room with the same name already exists
        exists = await rooms.find_one({"id": booking.roomId})
        if exists is None:
            return None
        print('a')
        
        user_exist = await collection.find_one({"uid": booking.booker.uid})
        if user_exist is None:
            u = booking.booker.dict()
            await users.insert_one(u)


        print(booking.dict())
        # Convert the Room object to a dictionary and insert it into the database
        booking.dateTo = booking.dateFrom + datetime.timedelta(hours=booking.duration)
        booking.status = "Reserved"
        dict = booking.dict()
        result = await collection.insert_one(dict)
        created = await collection.find_one({"_id": result.inserted_id})


    #     ss = ses.send_email(
    #     Source = "xfowth@gmail.com",
    #     Destination={
    #         'ToAddresses': [
    #             # booking.booker.email,
    #             "xfowth@gmail.com"
    #         ],
    #     },
    #     Message={
    #         'Subject': {
    #             'Data': "Booking confirmation",
    #         },
    #         'Body': {
    #             'Text': {
    #                 'Data': f"Your booking has been confirmed. \n\nRoom: {booking.roomId} \nDate: {booking.dateFrom} \nDuration: {booking.duration} hours \n\nThank you for using our service! \n\nBest regards, \nRoomman"
    #             },
    #         }
    #     }
    # )
        
        return Booking.parse_obj(created)
    except Exception as e:
        print(e)
        print("Error adding booking")
        return None

# Delete all rooms
async def deleteAllRooms():
    collection = db['rooms']
    await collection.delete_many({})
    return True
    
async def getAllBookings():
    # Get all bookings from the database
    collection = db['bookings']

    # with aggregation, join the user collection to the bookings collection
    pipeline = [
        {
            "$lookup": {
                "from": "users",
                "localField": "booker.uid",
                "foreignField": "uid",
                "as": "booker"
            }
        },
         { "$unwind": "$booker" },
        {
            "$lookup": {
                "from": "rooms",
                "localField": "roomId",
                "foreignField": "id",
                "as": "room"
            }
        },
         { "$unwind": "$room" },
    ]
    bookings = await collection.aggregate(pipeline).to_list(length=1000)

    # bookings = await collection.find().to_list(length=1000)
    return[Booking.parse_obj(x) for x in bookings]

async def getBookingsByUser(uid: str):
    # Get all bookings from the database
    collection = db['bookings']

    # with aggregation, join the user collection to the bookings collection
    pipeline = [
        {
            "$lookup": {
                "from": "users",
                "localField": "booker.uid",
                "foreignField": "uid",
                "as": "booker"
            }
        },
         { "$unwind": "$booker" },
        {
            "$lookup": {
                "from": "rooms",
                "localField": "roomId",
                "foreignField": "id",
                "as": "room"
            }
        },
         { "$unwind": "$room" },
        {
            "$match": {
                "booker.uid": uid
            }
        }
    ]
    bookings = await collection.aggregate(pipeline).to_list(length=1000)

    # bookings = await collection.find().to_list(length=1000)
    return[Booking.parse_obj(x) for x in bookings]

async def getBookingsByRoom(roomId: str):
    # Get all bookings from the database
    collection = db['bookings']

    # with aggregation, join the user collection to the bookings collection
    pipeline = [ 
        {
            "$match": {
                "roomId": roomId
            }
        },
            {
            "$lookup": {
                "from": "users",
                "localField": "booker.uid",
                "foreignField": "uid",
                "as": "booker"
            }
        },
         { "$unwind": "$booker" },
        {
            "$lookup": {
                "from": "rooms",
                "localField": "roomId",
                "foreignField": "id",
                "as": "room"
            }
        },
         { "$unwind": "$room" },
    ]
    bookings = await collection.aggregate(pipeline).to_list(length=1000)

    # bookings = await collection.find().to_list(length=1000)
    return[Booking.parse_obj(x) for x in bookings]

async def getBookingById(id: str):
    # Get all bookings from the database
    collection = db['bookings']

    # with aggregation, join the user collection to the bookings collection
    pipeline = [
        {
            "$match": {
                "_id": ObjectId(id)
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "booker.uid",
                "foreignField": "uid",
                "as": "booker"
            }
        },
         { "$unwind": "$booker" },
        {
            "$lookup": {
                "from": "rooms",
                "localField": "roomId",
                "foreignField": "id",
                "as": "room"
            }
        },
         { "$unwind": "$room" },
    ]
    bookings = await collection.aggregate(pipeline).to_list(length=1000)

    # bookings = await collection.find().to_list(length=1000)
    return Booking.parse_obj(bookings[0])

async def deleteBooking(id: str):
    collection = db['bookings']
    result = await collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return True
    else:
        return False

async def checkIfDateAvailable(roomId: str,  dateFrom: datetime.datetime, duration: int):
    collection = db['Bookings']
    # Check if a booking with the same roomId already exists
    dateTo = dateFrom + datetime.timedelta(hours=duration)

    # Get all bookings for the time period
    bookings = await collection.find({"roomId": roomId, "dateFrom": {"$gte": dateFrom}, "dateTo": {"$lte": dateTo}}).to_list(length=100)
    # If there are no bookings, return True
    if not bookings:
        return True
    # Else return False
    return False

# async def getAvailableDatesForRoom(roomId: str):
