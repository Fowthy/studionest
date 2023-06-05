import asyncio
# from aio_pika import logger
from fastapi import FastAPI
import logging, time
from .routes import payment_router
from .pika_client import PikaClient


logging.basicConfig()
logger = logging.getLogger("uvicorn")


class App(FastAPI):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.pika_client = PikaClient(self.log_incoming_message)

    @classmethod
    def log_incoming_message(cls, message: dict):
        logger.info('Here we got incoming message %s', message)


app = App(debug=True)
app.include_router(payment_router.router)

@app.on_event("startup")
async def startup():
    loop = asyncio.get_running_loop()
    task = loop.create_task(app.pika_client.consume(loop))
    await task
    # logger.info("Roomman service started")
    logger.info("Roomman service started")
