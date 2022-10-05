
from pydantic import BaseModel


class FieldBase(BaseModel):
    file_format: str


class FieldIn(FieldBase):
    file: str


class FieldOut(FieldBase):
    geojson: str
    area: str
    bbox: str
    centroid: str
