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


class Backline(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    desc: str
    quantity: int
    price: float
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class Room(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    owner: str = Field(...)
    desc: str = Field(...)
    location: str = Field(...)
    type: str = Field(...)
    pricePerHour: int = Field(...)
    backline: List[Backline]
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

class Type(BaseModel):
    Rehearsal = "Rehearsal Room"
    Studio = "Recording Studio"


class BacklineBody(BaseModel):
    name: str = Field(...)
    desc: str = Field(...)
    quantity: int = Field(...)
    price: float = Field(...)