from fastapi import FastAPI
# from .mongodb import connect_to_mongo, close_mongo_connection
import logging
from .routes import html_router as html_routes
# from .routes import admin_routes


app = FastAPI() 
logging.basicConfig()

app.include_router(html_routes.router)