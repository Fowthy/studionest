import datetime
from typing import Tuple, List
from bson import ObjectId
from pydantic import BaseModel, Field
# from mongoengine import EmbeddedDocument, StringField, ListField, EmbeddedDocumentField

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class User(BaseModel):
    email: str
    name: str
    uid: str

class Room(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    owner: str = Field(...)
    owner_uid: str = Field(...)
    desc: str | None = None
    location: str = Field(...)
    type: str = Field(...)
    pricePerHour: int = Field(...)
    img: str | None = None
    backline: List[str] | None = None
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Jane Doe",
                "desc": "Description...",
                "location": "Somewhere..",
                "type": "Rehearsal Rom",
                "pricePerHour": "5.40",
            }
        }
    
class Backline(BaseModel):
    name: str
    price: float
    quantity: int
class Booking(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    booker: User
    roomId: str
    dateFrom: datetime.datetime
    dateTo: datetime.datetime | None
    duration:int
    totalPrice: float | None
    backline: List[Backline] | None
    status: str | None
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        
class BookingReserved(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    booker: User
    room: Room
    dateFrom: datetime.datetime
    dateTo: datetime.datetime | None
    duration:int
    totalPrice: float | None
    backline: List[str] 
    status: str | None
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        
# class Room(BaseModel):
#     id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
#     name: str = Field(...)
#     desc: str = Field(...)
#     location: str = Field(...)
#     type: str = Field(...)
#     pricePerHour: int = Field(...)
#     backline: List[Backline]
#     class Config:
#         allow_population_by_field_name = True
#         arbitrary_types_allowed = True
#         json_encoders = {ObjectId: str}

class Type(BaseModel):
    Rehearsal = "Rehearsal Room"
    Studio = "Recording Studio"


# class BookingBody(BaseModel):
#     roomId: str = Field(...)
#     dateFrom: datetime.datetime = Field(...)
#     duration: int = Field(...)
#     backline: List[str] = Field(...)


# class RoomBody(BaseModel):
#     name: str = Field(...)
#     desc: str = Field(...)
#     location: str = Field(...)
#     type: str = Field(...)
#     pricePerHour: int = Field(...)


# class BacklineBody(BaseModel):
#     name: str = Field(...)
#     desc: str = Field(...)
#     quantity: int = Field(...)
#     price: float = Field(...)