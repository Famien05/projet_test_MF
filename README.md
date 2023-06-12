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


-----------------

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from databases import SessionLocal, engine, User

class UserResponse(BaseModel):
    email: str
    nom: str
    prenom: str
    uid: str

app = FastAPI()

# middleware
origins = ["http://localhost:3000", "http://localhost"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/account/users/{uid}", response_model=List[UserResponse])
def get_user_data(uid: str, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.uid == uid).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    user = UserResponse(email=db_user.email, nom=db_user.nom, prenom=db_user.prenom, uid=db_user.uid)
    return [user]

@app.post("/api/account/users/", response_model=UserResponse)
def create_user(user: UserResponse, db: Session = Depends(get_db)):
    db_user = User(email=user.email, nom=user.nom, prenom=user.prenom, uid=user.uid)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


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






from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from db_manager import User, SessionLocal, engine  # Remplacez databases par db_manager

User.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Obtenez une session de base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

users = [
    {"email":"johndoe@example.com","name":"John Doe","uid":"f45934"},
    {"email":"janedoe@example.com","name":"Jane Doe","uid":"f45935"},
]  # Liste fictive d'utilisateurs 

def split_name(full_name: str) -> tuple:
    first_name, last_name = full_name.split(" ")
    return first_name, last_name

@app.get("/api/account/users/{uid}", response_model=User)
async def get_user_data(uid: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.uid == uid).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    else:
        user_info = {
            "uid": user.uid,
            "nom": user.nom,
            "prenom": user.prenom,
            "email": user.email
        }
        return user_info

@app.post("/api/account/users/{uid}")
async def create_user(uid: str, db: Session = Depends(get_db)):
    user_data = next((user for user in users if user["uid"] == uid), None)
    if user_data is None:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    else:
        first_name, last_name = split_name(user_data["name"])
        user_info = User(
            email = user_data["email"],
            nom = last_name,
            prenom = first_name,
            uid = user_data["uid"]
        )
        db.add(user_info)
        db.commit()
        db.refresh(user_info)
        return user_info
        
        
       
 from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from db_manager import User, SessionLocal, engine  # Remplacez databases par db_manager

User.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Obtenez une session de base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Liste d'utilisateurs fictifs
users = [
    {"email":"famienleroi.amoin@bnpparibas.com", "name":"FamienLeRoiAMOIN", "uid":"f45933"},
    {"email":"johndoe@example.com", "name":"John Doe", "uid":"f45934"},
    {"email":"janedoe@example.com", "name":"Jane Doe", "uid":"f45935"},
]

@app.get("/api/account/users/{uid}", response_model=User)
async def get_user_data(uid: str, db: Session = Depends(get_db)):
    # Chercher l'utilisateur dans la liste fictive d'abord
    user = next((u for u in users if u["uid"] == uid), None)
    
    # Si l'utilisateur n'est pas trouvé dans la liste fictive, chercher dans la base de données
    if user is None:
        user = db.query(User).filter(User.uid == uid).first()
        if user is None:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    return user

@app.post("/api/account/users/")
async def create_user(user: User, db: Session = Depends(get_db)):
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


D'accord, pour cela vous aurez besoin d'un ORM (Object-Relational Mapping) pour interagir avec votre base de données. `SQLAlchemy` est une bibliothèque populaire pour cela en Python. Vous aurez également besoin de `databases` pour le support asynchrone.

Voici comment vous pouvez configurer votre base de données PostgreSQL dans `database.py`:

```python
from sqlalchemy import create_engine, MetaData, Table, Column, String
from databases import Database

DATABASE_URL = "postgresql://user:password@localhost:5432/mydatabase"  # A remplacer avec vos informations

engine = create_engine(DATABASE_URL)
metadata = MetaData()

users_table = Table(
    "users",
    metadata,
    Column("uid", String, primary_key=True),
    Column("nom", String),
    Column("prénom", String),
    Column("email", String),
    Column("password", String)
)

database = Database(DATABASE_URL)
```

Puis, pour utiliser ce fichier dans `main.py`, vous pouvez simplement l'importer et utiliser `database` pour exécuter les requêtes SQL. Vous aurez besoin de quelques modifications pour rendre certains endroits asynchrones :

```python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from database import users_table, database

app = FastAPI()

class User(BaseModel):
    email: str
    name: str
    uid: str

class UserUid(BaseModel):
    uid: str

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/api/account/users/{uid}", response_model=List[User])
async def get_user_data(uid: str):
    query = users_table.select().where(users_table.c.uid == uid)
    users = await database.fetch_all(query)
    if not users:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    return users

@app.post("/api/account/store-user")
async def store_user(user_uid: UserUid):
    query = users_table.select().where(users_table.c.uid == user_uid.uid)
    user = await database.fetch_one(query)
    if user is None:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    print(user)
    return {"status": "User data received"}
```

Veuillez noter que ce code assume que vous avez une table `users` dans votre base de données PostgreSQL avec les colonnes `uid`, `nom`, `prénom`, `email` et `password`.

De plus, vous devrez installer `SQLAlchemy` et `databases` avec `asyncpg` (un pilote PostgreSQL asynchrone) en utilisant pip :

```bash
pip install sqlalchemy databases[postgresql]
```

Veuillez également noter que vous devrez ajuster la chaîne de connexion `DATABASE_URL` à votre base de données PostgreSQL.
