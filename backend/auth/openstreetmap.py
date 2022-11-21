import httpx
import os 
from common.responses import api_response




async def osm_login(state,code):
    client = httpx.AsyncClient()

    #verify that the state is valid
    if os.getenv('OSM_AUTH_STATE') != state:
        return api_response(message="invalid state code", status_code=400)
    
    #get access token from OSM 
    res = await client.post(url=os.getenv("OSM_ACCESS_TOKEN_URL"),
        data={
            "code":code,
            "client_secret":os.getenv("OSM_OAUTH2_CLIENT_SECRET"),
            "client_id":os.getenv('OSM_OAUTH2_CLIENT_ID'),
            "grant_type":"authorization_code",
            "redirect_uri":os.getenv('OSM_REDIRECT_URI')
        })
    data = res.json()
    if data.get("error"):
        return api_response(message=data,status_code=400)

    #get user info from osm as 
    user_res = await client.get(os.getenv("OSM_USER_DETAILS_URL"),headers={"Authorization":f"Bearer {data['access_token']}"})
    user_info = user_res.json()
    await client.aclose()
    return api_response(message="login successfully",status_code=200,data=user_info["user"])