# projet_test_MF
import subprocess

def get_new_mdp(BU, BL, ecosystem):
    cert_pfx = "votre_chemin_vers_cert_pfx"
    cert_key = "votre_chemin_vers_cert_key"
    postgresinst = "votre_valeur_postgresinst"
    postgresUser = "votre_valeur_postgresUser"
    hvaulturl = "votre_valeur_hvaulturl"
    
    from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import requests
from databases import Database
from sqlalchemy import create_engine, MetaData, Table, Column, String

DATABASE_URL = "postgresql://user:password@localhost:5432/mydatabase"

database = Database(DATABASE_URL)
metadata = MetaData()

users = Table(
    "users",
    metadata,
    Column("email", String(50)),
    Column("firstname", String(50)),
    Column("lastname", String(50)),
    Column("uid", String(50), primary_key=True),
)

engine = create_engine(DATABASE_URL)
metadata.create_all(engine)

app = FastAPI()

class User(BaseModel):
    email: str = Field(...)
    name: str = Field(...)
    uid: str = Field(...)

# Fonction pour séparer le nom et le prénom
def split_name(fullname):
    words = fullname.split()
    firstname, lastname = [], []

    for word in words:
        if word.isupper():
            lastname.append(word)
        else:
            firstname.append(word)

    return ' '.join(firstname), ' '.join(lastname)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/user/{uid}")
async def get_user(uid: str):
    response = requests.get(f"https://marketplace.staging.echonet/api/account/users?uids[]={uid}")
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="UID not found")
    data = response.json()[0]
    user = User(**data)  # Validation des données avec Pydantic
    firstname, lastname = split_name(user.name)
    query = users.insert().values(email=user.email, firstname=firstname, lastname=lastname, uid=user.uid)
    await database.execute(query)
    return {"message": "Données ingérées dans la base de données avec succès."}
