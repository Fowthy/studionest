from pydantic import BaseModel

class Admin(BaseModel):
    name: str
    location: str
    description: str
