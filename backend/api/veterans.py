from fastapi import APIRouter, HTTPException
from models.training import TrainingCreate, Training
from database import database
import sqlalchemy
from models.training import trainings_table
from datetime import time

router = APIRouter()

@router.get("/trainings")
async def my_offered_trainings(creator_id: int):
    query = trainings_table.select().where(trainings_table.c.creator_id == creator_id)
    trainings = await database.fetch_all(query)
    return trainings

@router.post("/add")
async def add_training(training: TrainingCreate):
    hours = training.time.hour
    minutes = training.time.minute

    training_time = time(hours, minutes)  # Convertissez la chaîne en objet time

    query = trainings_table.insert().values(
        title=training.title,
        description=training.description,
        date=training.date,
        time=training_time,  # Utilisez l'objet time pour l'insertion
        creator_id=training.creator_id,
        link=training.link
    )
    training_id = await database.execute(query)
    return training_id


@router.delete("/delete/{training_id}")
async def delete_training(training_id: int):
    query = trainings_table.delete().where(trainings_table.c.id == training_id)
    await database.execute(query)
    return {"detail": f"Training with id {training_id} deleted successfully."}
