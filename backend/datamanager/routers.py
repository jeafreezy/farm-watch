from fastapi import APIRouter
from fastapi import UploadFile
from .models import ImagerySearchQueryRequestModel
from .utils import file_transformer, validate_files
from common.responses import api_response
from typing import List
import httpx


router = APIRouter(tags=["Data Manager & EO Factory"], prefix="")

#SpatioTemporal Asset Catalogue - STAC Cloud Optimized GeoTiffs (COGs)
#explore with DEA ARD STAC endpoints

STAC_ENDPOINT = "https://earth-search.aws.element84.com/v0/search"


HEADERS = {
        "Content-Type":"application/json",
        "Accept":"application/geo+json"
}



@router.post("/upload-files")
def upload_files(files: List[UploadFile]):
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
    

    # validate files
   
    validated_files, status_code, message = validate_files(files)

    if status_code != 200:
        return api_response(status_code=status_code, message=message)

    # transform files

    transformed_files, status_code, message = file_transformer(validated_files)

    if status_code != 200:
        return api_response(message=message, status_code=400)

    return api_response(message=message, data=transformed_files, status_code=200)



@router.post(path='/search-imagery')
async def search_imagery(query:ImagerySearchQueryRequestModel):
    """
        Search for EO Imagery based on provided query parameters
    """
    query_dict = query.dict()

    collection = query_dict["collection"]
    start_date = query_dict["start_date"]
    end_date = query_dict["end_date"]
    cloud_cover = query_dict["cloud_cover"]
    limit = query_dict["limit"]
    bbox = query_dict["bbox"]

    post_body = {
        "collections":[collection], #sentinel-s2-l2a-cogs, landsat...
        "datetime":f"{start_date}/{end_date}",
        "query":{
            "eo:cloud_cover":{
                "lt":cloud_cover
            }
        },
        "bbox":bbox,
        "limit":limit,
        #"intersects":geojson geometry
        #TODO: add more filters to reduce response object from STAC API
    }
    


    with httpx.AsyncClient() as client:

        res = await client.post(url=STAC_ENDPOINT,headers=HEADERS,json=post_body)
        
        return res.json()
    