
from typing import Optional,Sequence
from pydantic import BaseModel




class ImagerySearchQueryRequestModel(BaseModel):
    collection:str
    start_date:str 
    end_date:str
    cloud_cover: Optional[int]=10     #cloud cover less than 10 by default unless the user specify
    bbox:Sequence[float]
    limit:Optional[int]=10 #limit query response to 10 unless specified


