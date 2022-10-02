from .database import Base
from sqlalchemy import Column, DateTime
import datetime
import uuid
from sqlalchemy.dialects.postgresql import UUID


# Resources
# UUIDs -> https://stackoverflow.com/questions/183042/how-can-i-use-uuids-in-sqlalchemy
# DateTime -> https://stackoverflow.com/questions/13370317/sqlalchemy-default-datetime


class BaseModel(Base):
    __abstract__ = True
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True,
        default=uuid.uuid4,
        unique=True,
    )
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)
    updated_at = Column(
        DateTime(timezone=True),
        default=datetime.datetime.utcnow,
        onupdate=datetime.datetime.utcnow,
    )
