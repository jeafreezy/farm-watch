import fastapi


router = fastapi.APIRouter(tags=["Common Routes"])


@router.get("/health-check")
async def health_check():
    """
    Checks the health of the server.
    
    """
    return {"ping": "pong"}
