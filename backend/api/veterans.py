from fastapi import APIRouter, HTTPException
from models.training import TrainingCreate, Training, TrainingUpdate
from database import database
import sqlalchemy
from models.training import trainings_table, user_trainings_table
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

    training_time = time(hours, minutes)

    query = trainings_table.insert().values(
        title=training.title,
        description=training.description,
        date=training.date,
        time=training_time,
        creator_id=training.creator_id,
    )
    training_id = await database.execute(query)
    return training_id

@router.delete("/delete/{training_id}")
async def delete_training(training_id: int):
    # Supprime les inscriptions des utilisateurs à cette formation
    user_trainings_query = user_trainings_table.delete().where(user_trainings_table.c.training_id == training_id)
    await database.execute(user_trainings_query)
    # Supprime la formation
    query = trainings_table.delete().where(trainings_table.c.id == training_id)
    await database.execute(query)
    return {"detail": f"Training with id {training_id} deleted successfully."}

@router.put("/update/{training_id}")
async def update_training(training_id: int, updated_training: TrainingUpdate):
    query = trainings_table.update().where(trainings_table.c.id == training_id).values(
        title=updated_training.title,
        description=updated_training.description,
        date=updated_training.date,
        time=updated_training.time
    )
    await database.execute(query)
    return {"detail": f"Training with id {training_id} updated successfully."}
