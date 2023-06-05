from fastapi import APIRouter, Depends, HTTPException, FastAPI, Header, Request, Response
from src.main.contentlib.app.services import html_service as htmlService

router = APIRouter(prefix="/api/contentlib")

# # Get all rooms
# @router.get("/rooms", status_code=200)
# async def getRooms():
#     rooms = await htmlService.getAllRooms()
#     return rooms


@router.get("/content")
def read_root():
    return  [{
    'name': 'Rooms',
    'items': [
      {
        'name': 'Manage Rooms',
        'slug': 'rooms',
        'description': 'Manage all rooms',
      },
        {
        'name': 'Manage Backline',
        'slug': 'backline',
        'description': 'Manage all backline items',
      },

    ],
  },
  {
    'name': 'Bookings',
    'items': [
          {
        'name': 'Overview',
        'slug': 'overview',
        'description': 'View overview and statistics of all bookings',
      },
      {
        'name': 'View all bookings',
        'slug': 'bookings',
        'description': 'View all bookings',
      },
        {
        'name': 'Customers',
        'slug': 'customers',
        'description': 'View all customers',
      },

    ],
  },
  {
    'name': 'Organization',
    'items': [
          {
        'name': 'Settings',
        'slug': 'settings',
        'description': 'Manage organization data',
      },
      {
        'name': 'Security & Privacy',
        'slug': 'privacy',
        'description': 'Manage security and privacy settings of the account',
      }
    ],
  }]