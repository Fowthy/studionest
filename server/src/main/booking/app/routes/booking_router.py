from fastapi import APIRouter, Depends, HTTPException, FastAPI, Header, Response
from src.main.booking.app.models import Booking
from src.main.booking.app.services import booking_service as bookingService
from ..models import User

router = APIRouter(prefix="/api/booking")

# Get all rooms
@router.get("/bookings", status_code=200)
async def getBookings():
    bookings = await bookingService.getAllBookings()
    return bookings
# Get room by id
@router.get("/booking/{id}", status_code=200)
async def getBookingById(id: str):
    booking = await bookingService.getBookingById(id)
    return booking
@router.get("/booking/user/{uid}", status_code=200)
async def getBookingByUser(uid: str):
    booking = await bookingService.getBookingsByUser(uid)
    return booking

# Place a booking
@router.post("/booking", status_code=201)
async def addBooking(booking: Booking):
    created = await bookingService.addBooking(booking)
    if not created:
        raise HTTPException(status_code=400, detail="A room with this name already exists.")
    return created

# Delete booking by id
@router.delete("/booking/{id}", status_code=204)
async def deleteBooking(id: str):
    deleted = await bookingService.deleteBooking(id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Booking not found")
    return Response(status_code=204)

@router.get('/availablerooms', status_code=200)
async def getAvailableRooms():
    rooms = await bookingService.getAvailableRooms()
    return rooms

# Update a room
# @router.put("/room", status_code=200)
# async def updateRoom(
#     updated: RoomBody,
#     id: str = Header(None)
# ):
#     result = await roomService.updateRoom(id, updated)
#     if result is None:
#         raise HTTPException(status_code=404, detail="Room not found")
#     return result

# # Get a room by id 
# @router.get("/room/{id}", status_code=200)
# async def getRoom(
#     id,
#     # id: str = Header(None)
# ):
#     if id is None:
#         raise HTTPException(status_code=400, detail="Room id is required")
    
#     room = await roomService.getRoom(id)
#     if room is None:
#         raise HTTPException(status_code=404, detail="Room not found")
#     return room

# # Delete a room by id
# @router.delete("/room/{id}", status_code=204)
# async def deleteRoom(
#     id,
# ):
#     deleted = await roomService.deleteRoom(id)
#     if not deleted:
#         raise HTTPException(status_code=404, detail="Room not found")
#     return Response(status_code=204)
