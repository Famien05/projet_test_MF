from databases import Database  # pip install databases
import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:Mariab102.@localhost:5432/Projet"
database = Database(DATABASE_URL)

metadata = sqlalchemy.MetaData()

engine = sqlalchemy.create_engine(
    DATABASE_URL, pool_size=20, max_overflow=0
)

metadata.create_all(engine)

Base = declarative_base(metadata=metadata)
