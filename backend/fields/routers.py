import fastapi
from common.responses import api_response
from fields.schemas import FieldIn
from fields.utils import file_transformer, file_validator


router = fastapi.APIRouter(tags=["fields"], prefix="/fields")


@router.patch("/{field_id}")
async def edit_field():
    pass


@router.post("/")
async def upload_file(file: fastapi.UploadFile):

    validated_file, status_code, message = file_validator(file)

    if status_code != 200:
        return api_response(status_code=status_code, message=message)

    centroid, area, bbox, size, name, geom = file_transformer(validated_file)
    data = {
        "field_area": area,
        "field_bbox": bbox,
        "field_size": size,
        "field_name": name,
        "field_geom": geom,
        "field_centroid": centroid,
    }
    return api_response(
        message="File uploaded successfully", status_code=200, data=data
    )


@router.delete("/{field_id}")
async def delete_field():
    pass


@router.get("/{field_id}")
async def download_field():
    pass
