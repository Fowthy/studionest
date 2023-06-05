from fastapi import APIRouter, Depends, HTTPException, FastAPI, Header, Request, Response
from app.models import Room
from app.services import chat_service as chatService
from ..schema import MessageSchema

router = APIRouter(prefix="/api/chat")

# Get all rooms
@router.get("/rooms", status_code=200)
async def getRooms():
    rooms = await chatService.getAllRooms()
    return rooms


# Get a room by id 
@router.get("/room/{id}", status_code=200)
async def getRoom(
    id,
    # id: str = Header(None)
):
    if id is None:
        raise HTTPException(status_code=400, detail="Room id is required")
    
    room = await chatService.getRoom(id)
    if room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return room
