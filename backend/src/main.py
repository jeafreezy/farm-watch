from fields.routers import fields_router
from fastapi import FastAPI

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


app.include_router(fields_router)
