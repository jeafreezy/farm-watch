from geoalchemy2 import Geography, Geometry
from sqlalchemy import Column, Integer, String, ARRAY, FLOAT, ForeignKey
from common.models import BaseModel
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship


class Field(BaseModel):
    __tablename__ = "fields"
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
        primary_key=True,
        index=True,
    )
    field_name = Column(
        String(50), nullable=False
    )  # -> autonegerate upon creation for the user e.g Field 1, Field 2 etc
    centroid = Column(String(10), nullable=False)
    area = Column(FLOAT, nullable=False)
    bbox = Column(ARRAY(FLOAT), nullable=False)
    notes = Column(String(3000), nullable=True)
    geom = Column(
        Geometry(geometry_type="POLYGON", srid=4326, spatial_index=True, nullable=False)
    )
    owner = relationship("User", back_populates="fields")
