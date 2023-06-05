from fastapi import Depends, FastAPI, HTTPException, Header, Security, status

from src.main.auth.app import auth as authRouter


app = FastAPI()

app.include_router(authRouter.router)