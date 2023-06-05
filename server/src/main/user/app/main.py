import asyncio
# from aio_pika import logger
from fastapi import FastAPI
import logging, time
from .routes import user_router


logging.basicConfig()
logger = logging.getLogger("uvicorn")


app = FastAPI()
app.include_router(user_router.router)

@app.on_event("startup")

async def startup():
    # loop = asyncio.get_running_loop()
    # task = loop.create_task(app.pika_client.consume(loop))
    # await task
    # logger.info("Roomman service started")
    logger.info("Roomman service started")
