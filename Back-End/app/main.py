from fastapi import FastAPI

from .config.database import engine, get_db
from .entity import models

models.Base.metadata.create_all(bind=engine)
app = FastAPI()
@app.get("/")
async def root():
    return {"message": "Hello World"}