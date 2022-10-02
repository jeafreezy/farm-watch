import fastapi


router = fastapi.APIRouter(tags=["common"])


@router.get("/health-check")
async def health_check():
    return {"ping": "pong"}
