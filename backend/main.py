# custom modules
from fields.models import BaseModel as field_models
from fields.routers import router as field_router
from common.routers import router as common_router


# FastAPI & SQLAlchemy
from fastapi import FastAPI
from common.database import engine


# Models
field_models.metadata.create_all(bind=engine)


# Swagger API custom description

description = """
Farm Watch API powers the [farmwatch web app]()

## Functionalities

1. Data manager - Handle data upload, transformation and conversion from the FE
2. Farm analytics & insight
3. Near real time crop monitoring
4. Weather information and forecast

"""

tags_metadata = [
    {
        "name": "fields",
        "description": "A plot of land used for agricultural activities",
    },
    {
        "name": "common",
        "description": "Common endpoints such as healthcheck etc...",
    },
]


# Fast API application

app = FastAPI(
    title="Farm Watch API",
    description=description,
    version="0.0.1",
    contact={"name": "Emmanuel Jolaiya", "url": "https://github.com/jeafreezy"},
    license_info={
        "name": "MIT",
    },
    openapi_tags=tags_metadata,
)

# Routers

app.include_router(field_router)
app.include_router(common_router)
