from fastapi import APIRouter
from fastapi import UploadFile
from .utils import file_transformer, validate_files
from common.responses import api_response
from typing import List

router = APIRouter(tags=["Data Manager"], prefix="/upload-files")


@router.post("/")
async def upload_files(files: List[UploadFile]):
    """
    accepts : {
        files:[array of files],
        Mime/media type -> Multipart formdata
    }
    
    returns : {
        data:[
            {   
                "type":"FeatureCollection",
                "features":[...]

            }
        ],
        message:"Response message",
        status_code : 200 | 400 | 422 | 201 ...
    }
    
    """
    # TODO : Customize error message, support more file formats e.g shapefile(zipped), CSV

    # validate files

    validated_files, status_code, message = validate_files(files)

    if status_code != 200:
        return api_response(status_code=status_code, message=message)

    # transform files

    transformed_files, status_code, message = file_transformer(validated_files)

    if status_code != 200:
        return api_response(message=message, status_code=400)

    return api_response(message=message, data=transformed_files, status_code=200)



