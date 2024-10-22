from fastapi import APIRouter, Request
from app import load_knowledge_data

router = APIRouter()


@router.post("/load_knowledge_data", tags=["Knowledge Repo"])
async def load_data(request: Request):
    dataset = load_knowledge_data()
    return dataset