import fastapi


router = fastapi.APIRouter(tags=["Common"])


@router.get("/health-check")
async def health_check():
    return {"ping": "pong"}
