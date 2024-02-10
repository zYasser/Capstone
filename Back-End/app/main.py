from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from h11 import Request

from app.utils.validation_exception import get_excpetion_data

from .config.database import engine, get_db
from .entity import models
from .router import (user)

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(user.router)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400,
        content={
            "detail": get_excpetion_data(exc.errors()),
        },
    )


@app.get("/")
async def root():
    return {"message": "Hello World"}
