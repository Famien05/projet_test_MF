from fastapi import APIRouter, HTTPException
from models.training import TrainingCreate, Training
from database import database
import sqlalchemy
from models.training import trainings_table


router = APIRouter()

@router.get("/trainings")
async def my_trainings():
    pass

@router.get("/available")
async def available_trainings():
    query = trainings_table.select()
    trainings = await database.fetch_all(query)
    return trainings

@router.post("/enroll/{training_id}")
async def enroll(training_id: int):
    pass

@router.post("/withdraw/{training_id}")
async def withdraw(training_id: int):
    pass
