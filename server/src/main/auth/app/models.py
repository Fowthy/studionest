from bson import ObjectId
from fastapi_permissions import (
    Allow,
    Authenticated,
)
from pydantic import BaseModel, Field

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

# Class used for the login form
class LoginUser(BaseModel):
    email: str
    password: str

# Class used for the signup form
class SignupUser(BaseModel):
    email: str
    password: str
    name: str
    city: str | None = None
    uid: str | None = None
    principals: list[str] | None = None

    
class SignupOrganization(BaseModel):
    email: str
    password: str
    name: str
    city: str
    phone: str
    address: str
    uid: str | None = None
    principals: list[str] | None = None


# Storing user permissions
class UserPermissions:
    def __acl__(self):
        return [
            (Allow, Authenticated, "member"),
            (Allow, "role:admin", "admin"),
            (Allow, "role:company", "company"),
            (Allow, "role:guest", "view"),
            # (Allow, f"user:{self.uid}", "use"),
        ]
    
# Class used for the user model
class User(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: str
    name: str
    uid: str | None = None
    phone: str | None = None
    address: str | None = None
    city: str | None = None
    principals: list[str] | None = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

