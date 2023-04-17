from fastapi import APIRouter, HTTPException
from models.user import User, UserCreate, UserOut
from database import database
import sqlalchemy
from passlib.hash import bcrypt
from pydantic import BaseModel

router = APIRouter()

users_table = sqlalchemy.Table(
    "users",
    sqlalchemy.MetaData(),
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("first_name", sqlalchemy.String),
    sqlalchemy.Column("last_name", sqlalchemy.String),
    sqlalchemy.Column("email", sqlalchemy.String),
    sqlalchemy.Column("hashed_password", sqlalchemy.String),
    sqlalchemy.Column("service", sqlalchemy.String),
    sqlalchemy.Column("position", sqlalchemy.String),
    sqlalchemy.Column("is_veteran", sqlalchemy.Boolean),
)

class LoginData(BaseModel):
    email: str
    password: str

async def authenticate_user(email: str, password: str):
    query = users_table.select().where(users_table.c.email == email)
    user_record = await database.fetch_one(query)
    
    if not user_record or not bcrypt.verify(password, user_record["hashed_password"]):
        return None
    
    user = User(**user_record)
    return user

@router.post("/signup", response_model=UserOut)
async def signup(user: UserCreate):
    hashed_password = bcrypt.hash(user.password)
    query = users_table.insert().values(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        hashed_password=hashed_password,
        service=user.service,
        position=user.position,
        is_veteran=user.is_veteran
    )
    user_id = await database.execute(query)
    created_user = {**user.dict(), "id": user_id}
    return created_user

@router.post("/login")
async def login(login_data: LoginData):
    user = await authenticate_user(login_data.email, login_data.password)

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Générez un token ou utilisez tout autre mécanisme de connexion que vous utilisez
    # Par exemple, vous pouvez utiliser JWT (JSON Web Tokens)
    # token = your_login_functions_module.create_access_token(user)
    # return {"token": token}
    
    # Si vous ne gérez pas les tokens pour le moment, retournez simplement l'utilisateur pour tester la connexion
    return user
