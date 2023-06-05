import asyncio
import pytest
from fastapi.testclient import TestClient
# from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from src.main.roomman.app.mongodb import db
from src.main.roomman.app.main import app
from src.main.roomman.app.models import Room, BacklineBody, Backline


client = TestClient(app)
    
def test_create_room():
    # Create a test room
    test_room = dict(
        name="Room 4.999",
        owner="Test Owner",
        desc="Test Description",
        location="Test Location",
        type="Rehearsal Room",
        pricePerHour="19"
    )

    # Make a request to create the room
    # response = client.post("/api/roomman/room", json=test_room)
    # print(response)

    # # Check that the response is successful
    # assert response.status_code == 201

    # Check that the room was created in the database
    # async with AsyncIOMotorClient() as client:
    #     db = client['test_database']
    #     created_room = await db['rooms'].find_one({"_id": response.json()["_id"]})

    # created_room = db['rooms'].find_one({"_id": response.json()["_id"]})
    
    # assert created_room is not None

    # # Check that the created room matches the test room
    # assert Room.parse_obj(created_room) == test_room

# def test_get_all_rooms():
#     # Make a request to get all rooms
#     response = client.get("/rooms")

#     # Check that the response is successful
#     assert response.status_code == 200

#     # Check that the response contains at least one room
#     assert len(response.json()) > 0

# async def test_update_room():
#     # Create a test room
#     test_room = Room(
#         name="Test Room",
#         owner="Test Owner",
#         desc="Test Description",
#         location="Test Location",
#         type="Rehearsal Room",
#         pricePerHour=10,
#         backline=[
#             Backline(
#                 name="Test Backline",
#                 desc="Test Backline Description",
#                 quantity=1,
#                 price=5.0
#             )
#         ]
#     )

#     # Insert the test room into the database
#     result = await db['rooms'].insert_one(test_room.dict())
#     test_room.id = result.inserted_id

#     # Update the test room
#     updated_room = Room(
#         name="Updated Room",
#         owner="Updated Owner",
#         desc="Updated Description",
#         location="Updated Location",
#         type="Recording Studio",
#         pricePerHour=20,
#         backline=[
#             Backline(
#                 name="Updated Backline",
#                 desc="Updated Backline Description",
#                 quantity=2,
#                 price=10.0
#             )
#         ]
#     )

#     # Make a request to update the room
#     response = client.put(f"/rooms/{str(test_room.id)}", json=updated_room.dict())

#     # Check that the response is successful
#     assert response.status_code == 200

#     # Check that the room was updated in the database
#     updated_room_dict = db['rooms'].find_one({"_id": test_room.id})
#     assert updated_room_dict is not None

#     # Check that the updated room matches the test room
#     assert Room.parse_obj(updated_room_dict) == updated_room

# async def test_get_room():
#     # Create a test room
#     test_room = Room(
#         name="Test Room",
#         owner="Test Owner",
#         desc="Test Description",
#         location="Test Location",
#         type="Rehearsal Room",
#         pricePerHour=10,
#         backline=[
#             Backline(
#                 name="Test Backline",
#                 desc="Test Backline Description",
#                 quantity=1,
#                 price=5.0
#             )
#         ]
#     )

#     # Insert the test room into the database
#     result = await db['rooms'].insert_one(test_room.dict())
#     test_room.id = result.inserted_id

#     # Make a request to get the room by id
#     response = client.get(f"/rooms/{str(test_room.id)}")

#     # Check that the response is successful
#     assert response.status_code == 200

#     # Check that the response contains the test room
#     assert Room.parse_obj(response.json()) == test_room

# def test_delete_room():
#     # Create a test room
#     test_room = Room(
#         name="Test Room",
#         owner="Test Owner",
#         desc="Test Description",
#         location="Test Location",
#         type="Rehearsal Room",
#         pricePerHour=10,
#         backline=[
#             Backline(
#                 name="Test Backline",
#                 desc="Test Backline Description",
#                 quantity=1,
#                 price=5.0
#             )
#         ]
#     )

#     # Insert the test room into the database
#     result = db['rooms'].insert_one(test_room.dict())
#     test_room.id = result.inserted_id

#     # Make a request to delete the room by id
#     response = client.delete(f"/rooms/{str(test_room.id)}")

#     # Check that the response is successful
#     assert response.status_code == 200

#     # Check that the room was deleted from the database
#     deleted_room = db['rooms'].find_one({"_id": test_room.id})
#     assert deleted_room is None