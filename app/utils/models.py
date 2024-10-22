from pydantic import BaseModel
from typing import List


class CategoryExample(BaseModel):
    title: str
    code: str

class Category(BaseModel):
    id: int = 0
    name: str
    description: str
    examples: List[CategoryExample]
    
class DeleteCategory(BaseModel):
    id: int
    