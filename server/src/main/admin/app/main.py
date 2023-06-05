from fastapi import FastAPI
import logging
from .routes import admin_routes


logging.basicConfig()
app = FastAPI() 

app.include_router(admin_routes.router)

