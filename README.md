D'accord, voici l'ensemble des codes dans les fichiers respectifs :

**Fichier databases.py :**
```python
from sqlalchemy import create_engine, Column, String
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "postgresql://user:password@localhost:5432/mydatabase"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    email = Column(String)
    nom = Column(String)
    prenom = Column(String)
    uid = Column(String, primary_key=True)

# Assurez-vous que les tables sont créées
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```
**Fichier main.py :**
```python
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import List
from databases import get_db, User

app = FastAPI()

class UserUid(BaseModel):
    uid: str

users = [
    {"email":"johndoe@example.com","name":"John Doe","uid":"f45934"},
    {"email":"janedoe@example.com","name":"Jane Doe","uid":"f45935"},
]  # Liste fictive d'utilisateurs

def split_name(full_name: str) -> tuple:
    first_name, last_name = full_name.split(" ")  # Modifier selon la logique de votre fonction
    return first_name, last_name

@app.get("/api/account/users/{uid}", response_model=List[User])
async def get_user_data(uid: str):
    for user in users:
        if user["uid"] == uid:
            return [user for user in users if user["uid"] == uid]
    raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

@app.post("/api/account/store-user")
async def store_user(user_uid: UserUid, db: Session = Depends(get_db)):
    for user in users:
        if user["uid"] == user_uid.uid:
            first_name, last_name = split_name(user["name"])
            user_info = User(
                email = user["email"],
                nom = last_name,
                prenom = first_name,
                uid = user["uid"]
            )
            db.add(user_info)
            db.commit()
            print(user_info)  # Affiche l'information de l'utilisateur dans la console
            return {"status": "User data received"}
    raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
```

Assurez-vous de remplacer "user", "password", "localhost", "5432" et "mydatabase" par vos propres informations d'identification et les détails de la base de données dans le fichier `databases.py`. De plus, votre fonction `split_name` peut nécessiter des ajustements en fonction de la façon dont les noms sont formatés dans vos données.

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    uid VARCHAR(255)
);

