import fastapi


router = fastapi.APIRouter(tags=["Fields"], prefix="/fields")


@router.patch("/{field_id}")
async def edit_field():
    pass


@router.delete("/{field_id}")
async def delete_field():
    pass


@router.get("/{field_id}")
async def download_field():
    pass
