from fastapi import APIRouter, Depends, HTTPException, FastAPI, Header, Request, Response
from src.main.payment.app.models import Room
from src.main.payment.app.services import payment_service as paymentService
from ..schema import MessageSchema

router = APIRouter(prefix="/api/payment")


