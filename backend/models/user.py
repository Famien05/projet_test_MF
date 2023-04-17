from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Boolean, Sequence
from database import Base

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    service: str
    position: str
    is_veteran: bool

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, Sequence("user_id_seq"), primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    hashed_password = Column(String, nullable=False)
    service = Column(String, nullable=False)
    position = Column(String, nullable=False)
    is_veteran = Column(Boolean, nullable=False)

    class Config:
        orm_mode = True

class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    service: str
    position: str
    is_veteran: bool

    class Config:
        orm_mode = True
