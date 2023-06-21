oracle+cx_oracle://user:password@host:port/?service_name=service


DATABASE_URL = "oracle+cx_oracle://grp_data_ap11115_it_write_p:password_here@SO1VL9985751:1521/X_11115_SAAM_106TI"



from urllib.parse import quote

password = quote("38#iZ]8DsUm3+P5")
SQLALCHEMY_DATABASE_URL = f"oracle+cx_oracle://APL_11115_US01:{password}@localhost:1521/?service_name=X002172P10"




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
async def create_user(user: Optional[UserIn] = None, db: Session = Depends(get_db)):
    try:
        if user is None:
            raise HTTPException(status_code=400, detail="User data not provided")

        db_user = db.query(database.User).filter(database.User.email == user.email).first()
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        db_user = database.User(uid=user.uid, email=user.email, name=user.name)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except HTTPException as http_exc:
        raise http_exc
    except IntegrityError:
        raise HTTPException(status_code=400, detail="User with this UID already exists")
    except OperationalError:
        raise HTTPException(status_code=500, detail="Could not connect to the database")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

Ce code crée un nouvel utilisateur si le `email` n'est pas déjà pris. Il renvoie une erreur 400 si l'email est déjà enregistré. Vous pouvez tester cette API à l'aide de Postman en envoyant une requête POST à `http://localhost:8000/users/` avec le corps de la requête contenant le JSON utilisateur.

Notez que vous devrez adapter l'URL de la base de données (`SQLALCHEMY_DATABASE_URL`), le nom d'utilisateur et le mot de passe à vos propres paramètres.
{
    "uid": "f05934",
    "name": "John Doe",
    "email": "johndoe@example.com"
}



@app.post("/users/")
async def create_user(user: Optional[UserIn] = None):
    db = database.SessionLocal()  # Ici, nous supposons que vous pouvez créer une session locale à partir du module de base de données

    try:
        if user is None:
            raise HTTPException(status_code=400, detail="User data not provided")

        db_user = db.query(database.User).filter(database.User.email == user.email).first()
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        db_user = database.User(uid=user.uid, email=user.email, name=user.name)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except HTTPException as http_exc:
        raise http_exc
    except IntegrityError:
        raise HTTPException(status_code=400, detail="User with this UID already exists")
    except OperationalError:
        raise HTTPException(status_code=500, detail="Could not connect to the database")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()






        Pour connecter votre application FastAPI à une base de données Oracle, vous pouvez utiliser la bibliothèque `cx_Oracle` pour Python. Voici comment vous pouvez adapter votre code:

Tout d'abord, installez `cx_Oracle` avec `pip`:

```
pip install cx_Oracle
```

Ensuite, adaptez votre `database.py`:

```python
import cx_Oracle
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "oracle://user:password@localhost:1521/xe"

engine = create_engine(DATABASE_URL, pool_recycle=1800)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "utilisateurs"

    uid = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
```

Adaptez votre `main.py`:

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
async def create_user(user: Optional[UserIn] = None, db: Session = Depends(get_db)):
    try:
        if user is None:
            raise HTTPException(status_code=400, detail="User data not provided")

        db_user = db.query(database.User).filter(database.User.email == user.email).first()
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        db_user = database.User(uid=user.uid, email=user.email, name=user.name)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except HTTPException as http_exc:
        raise http_exc
    except cx_Oracle.IntegrityError:
        raise HTTPException(status_code=400, detail="User with this UID already exists")
    except cx_Oracle.OperationalError:
        raise HTTPException(status_code=500, detail="Could not connect to the database")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

N'oubliez pas de remplacer `"oracle://user:password@localhost:1521/xe"` par les détails de connexion à votre base de données Oracle.

Gardez à l'esprit que cx_Oracle a besoin de certaines dépendances pour fonctionner correctement, notamment le client Oracle instantané. Assurez-vous que vous avez installé tous les prérequis pour cx_Oracle. 

Cette adaptation suppose que votre table "utilisateurs" a déjà été créée dans votre base de données Oracle. Si ce n'est pas le cas, vous devrez la créer avant de pouvoir exécuter ce code.

