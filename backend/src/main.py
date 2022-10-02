from fastapi import FastAPI, Path, Query

from pydantic import BaseModel
from common.models import ResponseModel
from typing import List

app = FastAPI()


@app.patch("/fields/{id}")
async def edit_field():
    # edit name, shape etc
    pass


@app.post("/fields")
async def upload_field():
    pass


@app.get("/users/{user_id}/fields")
async def get_user_fields(
    user_id: str = Path(
        default=None, description="The ID of the user", min_length=1, max_length=5
    ),
    q: str = Query(
        default=None, description="The data to query with", min_length=2, max_length=10
    ),
):
    return q


@app.delete("/fields/{field_id}")
async def delete_field(
    field_id: str = Path(..., description="The ID of the field to delete")
):
    pass


@app.get("/fields/{field_id}")
async def download_field():

    pass
