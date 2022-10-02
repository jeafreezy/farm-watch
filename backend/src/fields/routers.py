import fastapi

fields_router = fastapi.APIRouter(tags=["fields"], prefix="/fields")


@fields_router.patch("/{field_id}")
async def edit_field():
    pass


@fields_router.post("/")
async def upload_field():
    pass


@fields_router.delete("/{field_id}")
async def delete_field():
    pass


@fields_router.get("/{field_id}")
async def download_field():
    pass
