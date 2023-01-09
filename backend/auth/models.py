from pydantic import BaseModel


class LoginModel(BaseModel):
    code:str
    service:str='osm'
    state:str