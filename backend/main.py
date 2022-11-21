# custom modules
from common.routers import router as common_router
from datamanager.routers import router as datamanager_router
from auth.routers import router as auth_router
#fastAPI module
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
#titiler modules
from titiler.core.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from titiler.application.routers.stac import stac
from titiler.application.routers.cog import cog
from dotenv import load_dotenv
load_dotenv()


# Swagger API custom description

description = """
Farm Watch API powers the [farmwatch web app]()

## Functionalities

1. Data manager - Handle data upload, transformation and conversion from the FE
2. Farm analytics & insight
3. Near real time crop monitoring
4. Weather information and forecast

"""

# tags_metadata = [
    # {
    #     "name": "fields",
    #     "description": "A plot of land used for agricultural activities",
    # },
    # {
    #     "name": "common",
    #     "description": "Common endpoints such as healthcheck etc...",
    # },
# ]


# Fast API application

app = FastAPI(
    title="Farm Watch API",
    description=description,
    version="0.0.1",
    contact={"name": "Emmanuel Jolaiya", "url": "https://github.com/jeafreezy"},
    license_info={
        "name": "MIT",
    },
    # openapi_tags=tags_metadata,
)
origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://farm-watch-one.vercel.app"
]

app.add_middleware(CORSMiddleware,allow_origins=origins,allow_credentials=True,allow_methods=['*'],allow_headers=['*'])
# Routers
app.include_router(common_router)
app.include_router(datamanager_router)
app.include_router(auth_router)
app.include_router(cog.router, prefix="/cog", tags=["Cloud Optimized GeoTIFF"])
add_exception_handlers(app, DEFAULT_STATUS_CODES)
app.include_router(stac.router, prefix="/stac", tags=["SpatioTemporal Asset Catalog"])