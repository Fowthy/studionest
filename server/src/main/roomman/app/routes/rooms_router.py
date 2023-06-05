from fastapi import APIRouter, Depends, Form, HTTPException, FastAPI, Header, Request, Response
from src.main.roomman.app.models import Room
from src.main.roomman.app.services import room_service as roomService
from src.main.roomman.app.schema import MessageSchema
from src.main.shared.pika_client import PikaClient
from src.main.shared.pika_client import PikaClientPublish
import logging
from fastapi import FastAPI, UploadFile, File


logging.basicConfig()

router = APIRouter(prefix="/api/roomman")

def a(message):
    print(f"Received message: {message}")
    


pika_client = PikaClient(a)
pika_client_publish = PikaClientPublish()

# Get all rooms
@router.get("/rooms", status_code=200)
async def getRooms():
    rooms = await roomService.getAllRooms()
    return rooms

# Create a room
@router.post("/room", status_code=201)
async def createRoom(room: str = Form(...), image: UploadFile = File(None)):
    try:
        created = await roomService.createRoom(room, image)
        return created
    except Exception as e:
        raise HTTPException(status_code=400,detail=e)
    
# Create a room
# @router.post("/image", status_code=201)
# async def addImage(file: UploadFile = File(...)):
#     try:
#         # created = await roomService.upload_file(file)
#         return 
#     except Exception as e:
#         raise HTTPException(status_code=400,detail=e)

# Update a room
@router.put("/room", status_code=200)
async def updateRoom(
    updated: Room,
    id: str = Header(None)
):
    result = await roomService.updateRoom(id, updated)
    if result is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return result

# Get a room by id 
@router.get("/room/{id}", status_code=200)
async def getRoom(
    id,
    # id: str = Header(None)
):
    if id is None:
        raise HTTPException(status_code=400, detail="Room id is required")
    
    room = await roomService.getRoom(id)
    if room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return room

# Delete a room by id
@router.delete("/room/{id}", status_code=204)
async def deleteRoom(
    id,
):
    deleted = await roomService.deleteRoom(id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Room not found")
    return Response(status_code=204)

@router.post('/send-message')
async def send_message(payload: MessageSchema, request: Request):
    request.app.pika_client.send_message(
        {"message": payload.message}
    )
    return {"status": "ok"}


# Create a room
@router.post("/roomka", status_code=201)
async def createRoomka(payload: dict):
    pika_client_publish.publish(exchange='rooms', routing_key='add_room', message=payload)
    return payload
