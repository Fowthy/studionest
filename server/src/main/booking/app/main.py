import asyncio
from threading import Thread
from fastapi import FastAPI
import logging, time

from pydantic import BaseModel

from src.main.shared.pika_client import PikaClient
from .routes import booking_router
from .services.booking_service import addRoom, deleteRoom, updateRoom


logging.basicConfig()
app = FastAPI() 

app.include_router(booking_router.router)


class Message(BaseModel):
    message: str
    

logging.basicConfig()
logger = logging.getLogger("uvicorn")

pika_client = PikaClient(addRoom)
pika_client2 = PikaClient(deleteRoom)
pika_client3 = PikaClient(updateRoom)


@app.on_event("startup")
async def startup():
    loop = asyncio.get_running_loop()
    task = loop.create_task(pika_client.consume(loop,"rooms","add_room"))
    task2 = loop.create_task(pika_client2.consume(loop,"rooms","delete_room"))
    task3 = loop.create_task(pika_client3.consume(loop,"rooms","delete_room"))
    await asyncio.gather(task)
    
    # logger.info("Roomman service started")
    logger.info("Booking service started")
