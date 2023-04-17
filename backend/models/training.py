from pydantic import BaseModel
from datetime import date, time

from sqlalchemy import Column, Integer, String, Date, Time
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
)

class TrainingCreate(BaseModel):
    title: str
    description: str
    date: date
    time: time
    creator_id: int

class Training(BaseModel):
    id: int
    title: str
    description: str
    date: date
    time: time
    creator_id: int

    class Config:
        orm_mode = True
