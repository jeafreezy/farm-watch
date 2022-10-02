import fastapi

router = fastapi.APIRouter(tags=["fields"], prefix="/fields")


@router.patch("/{field_id}")
async def edit_field():
    pass


@router.post("/")
async def upload_field():
    pass


@router.delete("/{field_id}")
async def delete_field():
    pass


@router.get("/{field_id}")
async def download_field():
    pass
