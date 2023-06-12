import json
from fastapi.testclient import TestClient
from src.main.roomman.app.routes.rooms_router import router


client = TestClient(router)


def test_get_rooms():
    response = client.get("/api/roomman/rooms")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_rooms_with_invalid_path():
    response = client.get("/api/roomman/invalid_path")
    assert response.status_code == 404

def test_get_rooms_with_invalid_method():
    response = client.post("/api/roomman/rooms")
    assert response.status_code == 405


# def test_get_bookings():
#     response = client.get("/api/booking/bookings")
#     assert response.status_code == 200
#     assert isinstance(response.json(), list)

