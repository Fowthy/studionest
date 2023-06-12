import json
from fastapi.testclient import TestClient
import pytest
from src.main.roomman.app.routes.rooms_router import router as r
from src.main.roomman.app.routes.backline_router import router as br


client = TestClient(r)
client2 = TestClient(br)


# @pytest.mark.asyncio
# async def test_get_rooms():
#     response = client.get("/api/roomman/rooms")
#     assert response.status_code == 200
#     assert isinstance(response.json(), list)


# def test_create_room():
#     data = {
#         "room": "Test Room"
#     }
#     response = client.post("/api/roomman/room", data=data)
#     assert response.status_code == 201
#     assert response.json()["room"] == "Test Room"


# def test_delete_rooms():
#     response = client.delete("/api/roomman/rooms")
#     assert response.status_code == 204


# def test_update_room():
#     data = {
#         "name": "Updated Room"
#     }
#     response = client.put("/api/roomman/room", headers={"id": "1"}, json=data)
#     assert response.status_code == 200
#     assert response.json()["name"] == "Updated Room"


# def test_get_room():
#     response = client.get("/api/roomman/room/1")
#     assert response.status_code == 200
#     assert response.json()["id"] == 1


# def test_delete_room():
#     response = client.delete("/api/roomman/room/1")
#     assert response.status_code == 204


# def test_send_message():
#     data = {
#         "message": "Test Message"
#     }
#     response = client.post("/api/roomman/send-message", json=data)
#     assert response.status_code == 200
#     assert response.json()["status"] == "ok"


def test_send_room_to_booking():
    data = {
        "room": "Test Roomka"
    }
    response = client.post("/api/roomman/roomka", json=data)
    assert response.status_code == 201
    assert response.json()["room"] == "Test Roomka"

# def test_get_all_backlines():
#     response = client2.get("/api/roomman/backline")
#     assert response.status_code == 200
#     assert isinstance(response.json(), list)

# def test_get_backline_by_id():
#     # assuming that you have a valid backline id
#     response = client2.get(f"/api/roomman/backline/648247d45f6c1b63152b7a69")
#     assert response.status_code == 200
#     assert isinstance(response.json(), dict)