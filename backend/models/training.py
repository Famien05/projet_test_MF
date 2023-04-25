from pydantic import BaseModel
from datetime import date, time
from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from database import Base
import sqlalchemy

trainings_table = sqlalchemy.Table(
    "trainings",
    sqlalchemy.MetaData(),
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("description", sqlalchemy.String),
    sqlalchemy.Column("date", sqlalchemy.Date),
    sqlalchemy.Column("time", sqlalchemy.Time),
    sqlalchemy.Column("creator_id", sqlalchemy.Integer),
    sqlalchemy.Column("link", sqlalchemy.String) 

)

# Ajoutez cette partie pour créer la table user_trainings
user_trainings_table = sqlalchemy.Table(
    "user_trainings",
    sqlalchemy.MetaData(),
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("user_id", sqlalchemy.Integer, ForeignKey("users.id")),
    sqlalchemy.Column("training_id", sqlalchemy.Integer, ForeignKey("trainings.id")),

)

class TrainingCreate(BaseModel):
    title: str
    description: str
    date: date
    time: time
    creator_id: int
    link: str
    



class Training(BaseModel):
    id: int
    title: str
    description: str
    date: date
    time: time
    creator_id: int
    link: str

    class Config:
        orm_mode = True
