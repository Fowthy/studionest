from fastapi import APIRouter, Depends, HTTPException, FastAPI, Header, Request, Response

from app.services import admin_service as adminService


router = APIRouter(prefix="/api/admin")

