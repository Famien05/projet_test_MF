Bien sûr ! Voici les codes corrigés et complets pour `main.py`, `database.py` et `App.js` :

main.py:
```python
from datetime import timedelta
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import logging

logger = logging.getLogger(__name__)
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def split_name(fullname):
    words = fullname.split()
    firstname, lastname = [], []

    for word in words:
        if word.isupper():
            lastname.append(word)
        else:
            firstname.append(word)

    return ' '.join(firstname), ' '.join(lastname)

class User(BaseModel):
    email: str
    name: str
    uid: str

class UserUid(BaseModel):
    uid: str
    nom: str
    prenom: str
    email: str
    password: str

users = [
    {"email": "johndoe@example.com", "name": "John DOE", "uid": "£45934"},
    {"email": "janedoe@example.com", "name": "Jane DOE", "uid": "f45935"},
]

@app.get("/api/account/users/{uid}", response_model=List[User])
async def get_user_data(uid: str):
    for user in users:
        if user["uid"] == uid:
            return [user for user in users if user["uid"] == uid]
    raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

@app.post("/api/account/store-user")
async def store_user(user: UserUid):
    logger.info(f"Received request for trainings of user {user.uid}")
    for user in users:
        logger.info(f"User info before query: {user}")
        firstname, lastname = split_name(user["name"])
        query = users_table.insert().values(
            uid=user["uid"],
            nom=lastname,
            prenom=firstname,
            email=user["email"],
            password=user['uid'],
        )
        data = await database.execute(query)
        logger.info(f"Trainings: {data}")
        return data
```

database.py:
```python
from sqlalchemy import create_engine, MetaData, Table, Column, String
from databases import Database

DATABASE_URL = "postgresql://static-stage:9Uz3DZXCoy7jwv154hAd@pg0021003799.svc-np.paas.echonet:4229/1bmclouddb"
engine = create_engine(DATABASE_URL)
metadata = MetaData()

users_table = Table(
    "utilisateurs",
    metadata,
    Column("uid", String, primary_key=True),
    Column("nom", String),
    Column("prénom", String),
    Column("email", String),
    Column("password", String),
)

database = Database(DATABASE_URL)
```

App.js:
import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Envoi des données du formulaire à l'API
    fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        full_name: fullName,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <h2>Formulaire d'inscription</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="full_name">Nom complet:</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />

        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default App;
