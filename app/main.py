from fastapi import FastAPI
from app.routers import data_manager

VERSION = "0.1.0"
DESCRIPTION = "A FastAPI server to for my knowledge repository"


app = FastAPI(
    version=VERSION, description=DESCRIPTION
)


routers = [
    data_manager
]

for item in routers:
    app.include_router(item.router)


@app.get("/")
async def index():
    return {"version": VERSION}
