import asyncio
import json
import pytest
from fastapi.testclient import TestClient
# from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from src.main.roomman.app.mongodb import db
from src.main.roomman.app.main import app
from src.main.roomman.app.models import Room, BacklineBody, Backline


client = TestClient(app)

def test_get_all_rooms():
    response = client.get("/api/roomman/rooms")
    assert response.status_code == 200

# @pytest.fixture
# def test_room_data():
#     # This fixture returns a sample room data
#     return {
#         "name": "Test Room",
#         "location": "Test Location",
#         "capacity": 10,
#         "price": 100,
#         "backline": [],
#         "img": "http://testimage.com",
#         "description": "Test Description"
#     }

# def test_create_room(test_room_data):
#     # Use multipart form data to send both form fields and files
#     response = client.post("/api/roomman/room", data={"room": json.dumps(test_room_data)}, files={"image": ("test.png", open("test.png", "rb"), "image/png")})
#     assert response.status_code == 201

# def test_get_room(test_room_data):
#     # Here you should use a real room id, for this example we're using a placeholder
#     room_id = "real-room-id"
#     response = client.get(f"/api/roomman/room/{room_id}")
#     assert response.status_code == 200

# def test_update_room(test_room_data):
#     # Use a real room id, for this example we're using a placeholder
#     room_id = "real-room-id"
#     response = client.put("/api/roomman/room", headers={"id": room_id}, json=test_room_data)
#     assert response.status_code == 200

# def test_delete_room():
#     # Use a real room id, for this example we're using a placeholder
#     room_id = "real-room-id"
#     response = client.delete(f"/api/roomman/room/{room_id}")
#     assert response.status_code == 204

# def test_delete_all_rooms():
#     response = client.delete("/api/roomman/rooms")
#     assert response.status_code == 204