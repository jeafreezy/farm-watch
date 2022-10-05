from geoalchemy2 import Geometry
from sqlalchemy import Column, String, ARRAY, FLOAT
from common.models import BaseModel


class Field(BaseModel):
    __tablename__ = "fields"
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
