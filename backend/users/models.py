from sqlalchemy import Column, String
from common.models import BaseModel
from sqlalchemy.orm import relationship
from sqlalchemy_utils import URLType, EmailType

# Use OSM OAuth
class User(BaseModel):
    __tablename__ = "users"
    username = Column(String(100), nullable=False)
    profile_picture = Column(URLType, nullable=True)
    email = Column(EmailType, nullable=False)
    fields = relationship("Field", back_populates="owner")
