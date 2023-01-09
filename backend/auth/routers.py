from fastapi.routing import APIRouter
from common.responses import api_response
from .openstreetmap import osm_login
from .models import LoginModel

router = APIRouter(prefix="/auth",tags=["Authentication"])

#Gets the code and state from FE and fetches the user info with tokens from osm
@router.post('/login')
async def login(params:LoginModel):
    """Oauth2 Authentication"""
    if params.service == "osm":
        return await osm_login(state=params.state,code=params.code)
    return api_response(message="invalid request",status_code=400)