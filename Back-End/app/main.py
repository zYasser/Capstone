from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from app.router import support_ticket
from app.utils.seeding import seed
from fastapi.middleware.cors import CORSMiddleware

from app.utils.validation_exception import get_excpetion_data

from .config.database import engine, get_db
from .entity import models
from .router import user

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(user.router)
app.include_router(support_ticket.router)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400,
        content={
            "detail": get_excpetion_data(exc.errors()),
        },
    )


# origins allowed
origins = ["http://localhost:3000", "http://localhost:3000/"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}
