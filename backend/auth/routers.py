from fastapi.routing import APIRouter
from common.responses import api_response
from .openstreetmap import osm_login
import os 


router = APIRouter(prefix="/auth",tags=["Authentication"])


# Move to FE 
@router.get('/authorize')
async def osm_auth():
    """
    Oauth2 with Openstreetmap

    """
    auth_url = f"{os.getenv('OSM_AUTH_URL')}?response_type=code&scope=read_prefs&client_id={os.getenv('OSM_OAUTH2_CLIENT_ID')}&state={os.getenv('OSM_AUTH_STATE')}&redirect_uri={os.getenv('OSM_REDIRECT_URI')}"
    
    return {"auth_url":auth_url}

#This logic will move to FE- Just testing it out here
@router.get('/osm/callback')
async def callback(error:str=None,error_description:str=None,code:str=None,state:str=None):
    if(error or error_description):
        return api_response(message=str(error_description), status_code=400)
    
    return api_response(message="success", data={"code":code,"state":state}, status_code=200)



#Gets the code and state from FE and fetches the user info with tokens from osm
@router.post('/login')
async def login(code:str,state:str,service:str):
    """Oauth2 Authentication"""
    if service == "osm":
        return await osm_login(state=state,code=code)
    return api_response(message="invalid request",status_code=400)