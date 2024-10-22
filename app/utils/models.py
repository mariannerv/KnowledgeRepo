from pydantic import BaseModel
from typing import List


class CategoryExample(BaseModel):
    title: str
    code: str

class Category(BaseModel):
    name: str
    description: str
    examples: List[CategoryExample]
    