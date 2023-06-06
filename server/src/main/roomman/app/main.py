import asyncio
import threading
# from aio_pika import logger
from fastapi import FastAPI
import logging, time

from pydantic import BaseModel
from .routes import rooms_router, backline_router
from src.main.shared.pika_client import PikaClient


class Message(BaseModel):
    message: str

logging.basicConfig()
logger = logging.getLogger("uvicorn")

def log_incoming_message(message: dict):
    logger.info('Here we got incoming message %s',message)
    print(message)


app = FastAPI(debug=True)
pc = PikaClient(log_incoming_message)

@app.on_event("startup")
async def startup():
    # loop = asyncio.get_running_loop()
    # task = loop.create_task(pc.consume(loop,"rooms","add_room"))
    # await task
    
    logger.info("Roomman service started")
    logger.info("heh uhaha uau")

app.include_router(rooms_router.router)
app.include_router(backline_router.router)
