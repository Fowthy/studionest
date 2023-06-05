import os
from dotenv import dotenv_values
from motor.motor_asyncio import AsyncIOMotorClient

config_env = {
    **dotenv_values(".env"),  # load local file development variables
    **os.environ,  # override loaded values with system environment variables
}

client = AsyncIOMotorClient(os.environ.get('MONGODB'))
db = client.users

async def close_mongo_connection():
    client.close()
