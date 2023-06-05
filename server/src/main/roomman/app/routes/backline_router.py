from fastapi import APIRouter, Depends, HTTPException, FastAPI, Header, Response
from src.main.roomman.app.models import BacklineBody
from src.main.roomman.app.services import backline_service

router = APIRouter(prefix="/api/roomman")

# Get all backlines
@router.get("/backline", status_code=200)
async def getBackline():
    backline = await backline_service.getAllBackline()
    return backline

# Create a backline
@router.post("/backline", status_code=201)
async def createBackline(studio: BacklineBody):
    created = await backline_service.createBackline(studio)
    if not created:
        raise HTTPException(status_code=400, detail="A backline with this name already exists.")
    return created

# Update a backline
@router.put("/backline", status_code=200)
async def updateBackline(
    backline: BacklineBody,
    id: str = Header(None)
):
    updated = await backline_service.updateBackline(id, backline)
    if updated is None:
        raise HTTPException(status_code=404, detail="Backline not found")
    return updated

# Get a backline by id
@router.get("/backline/{id}", status_code=200)
async def getBacklineById(
    id,
):
    if id is None:
        raise HTTPException(status_code=400, detail="Backline id is required")
    
    found = await backline_service.getBackline(id)
    if found is None:
        raise HTTPException(status_code=404, detail="Backline not found")
    return found

# Delete a backline by id
@router.delete("/backline", status_code=204)
async def deleteBackline(
    id: str = Header(None),
):
    deleted = await backline_service.deleteBackline(id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Backline not found")
    return Response(status_code=204)
