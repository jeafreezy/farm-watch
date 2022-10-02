from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional


class UserBase(BaseModel):
    username: str
    profile_picture: Optional[str]
    email: str


class UserCreate(UserBase):
    ...


class UserResponse(UserBase):
    id: str
    created_at: datetime
    updated_at: datetime
    fields: List[dict]
    # Allows SQLAlchemy to work with pydantic
    class Config:
        orm_mode = True
