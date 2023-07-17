server {
    listen 80;

    location / {
        proxy_pass http://192.168.0.2:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}



from fastapi import APIRouter, HTTPException, Query
from models.training import TrainingCreate, Training
from database import database
from models.training import trainings_table, user_trainings_table
import logging
from models.user import User  
from .auth import users_table 
router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/trainings/{user_id}")
async def my_trainings(user_id: int):
    logger.info(f"Received request for trainings of user {user_id}")
    query = user_trainings_table.select().where(user_trainings_table.c.user_id == user_id)
    user_trainings = await database.fetch_all(query)
    logger.info(f"User trainings: {user_trainings}")

    training_ids = [user_training["training_id"] for user_training in user_trainings]
    trainings_query = trainings_table.select().where(trainings_table.c.id.in_(training_ids))
    trainings = await database.fetch_all(trainings_query)
    logger.info(f"Trainings: {trainings}")

    return trainings

@router.get("/creators/{creator_id}")
async def get_creator(creator_id: int):
    logger.info(f"Received request for creator with id {creator_id}")
    query = users_table.select().where(users_table.c.id == creator_id)
    creator = await database.fetch_one(query)
    logger.info(f"Query result: {creator}")  # Ajoutez cette ligne
    if creator:
        logger.info(f"Found creator: {creator}")
        return {"name": creator["first_name"] + " " + creator["last_name"]}
    else:
        logger.warning(f"Creator with id {creator_id} not found")
        raise HTTPException(status_code=404, detail="Creator not found")





@router.get("/available")
async def available_trainings():
    query = trainings_table.select()
    trainings = await database.fetch_all(query)
    return trainings

@router.post("/enroll/{training_id}")
async def enroll(training_id: int, user_id: int = Query(...)):
    query = user_trainings_table.insert().values(user_id=user_id, training_id=training_id)
    user_training_id = await database.execute(query)
    return {"detail": f"User with id {user_id} enrolled in training with id {training_id} successfully."}

@router.post("/withdraw/{training_id}")
async def withdraw(training_id: int, user_id: int):
    query = user_trainings_table.delete().where(user_trainings_table.c.user_id == user_id).where(user_trainings_table.c.training_id == training_id)
    await database.execute(query)
    return {"detail": f"User with id {user_id} withdrawn from training with id {training_id} successfully."}
