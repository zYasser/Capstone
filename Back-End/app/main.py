from fastapi import FastAPI

from .config.database import engine, get_db
from .entity import models
from .router import user
models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(user.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
