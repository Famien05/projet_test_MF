from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from api import newcomers, veterans, auth
from database import database, Base

app = FastAPI()

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(newcomers.router, prefix="/newcomers", tags=["newcomers"])
app.include_router(veterans.router, prefix="/veterans", tags=["veterans"])
