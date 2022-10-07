from fastapi import status, HTTPException


# 201 -> Created
# 200 -> Success/OK
# 400 -> Bad request
# 422 -> Validation error
# 404 -> Not found


def api_response(message: str, status_code: int, data: dict = None):
    if status_code == 201:
        return {
            "message": message,
            "status_code": status.HTTP_201_CREATED,
            "data": data,
        }
    if status_code == 200:
        return {"message": message, "status_code": status.HTTP_200_OK, "data": data}

    if status_code == 400:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=message)
    if status_code == 404:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=message)
    if status_code == 422:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=message
        )
