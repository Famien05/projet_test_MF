from pydantic import BaseModel
from datetime import datetime

class TrainingCreate(BaseModel):
    title: str
    date: datetime
    time: str
    max_students: int
    veteran_id: int

class Training(BaseModel):
    id: int
    title: str
    date: datetime
    time: str
    max_students: int
    veteran_id: int

    class Config:
        orm_mode = True
