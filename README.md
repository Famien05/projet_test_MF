D'accord, voici comment vous pourriez structurer votre application FastAPI avec SQLAlchemy pour la gestion de base de données Postgres.

D'abord, votre fichier `database.py` pourrait ressembler à ceci:

```python
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/database"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "utilisateurs"

    uid = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
```
Pour créer la table, vous pouvez utiliser ce script SQL dans pgAdmin:
```sql
CREATE TABLE utilisateurs (
    uid VARCHAR PRIMARY KEY,
    name VARCHAR,
    email VARCHAR UNIQUE
);
```
Et pour le fichier `main.py`, voici comment définir la route POST:
```python
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
import database

class UserIn(BaseModel):
    uid: str
    name: str
    email: str

app = FastAPI()

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/")
def create_user(user: UserIn, db: Session = Depends(get_db)):
    db_user = db.query(database.User).filter(database.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = database.User(uid=user.uid, email=user.email, name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
```

Ce code crée un nouvel utilisateur si le `email` n'est pas déjà pris. Il renvoie une erreur 400 si l'email est déjà enregistré. Vous pouvez tester cette API à l'aide de Postman en envoyant une requête POST à `http://localhost:8000/users/` avec le corps de la requête contenant le JSON utilisateur.

Notez que vous devrez adapter l'URL de la base de données (`SQLALCHEMY_DATABASE_URL`), le nom d'utilisateur et le mot de passe à vos propres paramètres.
