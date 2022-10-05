from typing import final
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from decouple import config

# Database setup

engine = create_engine(config("SQLALCHEMY_DATABASE_URL"), future=True)  # , echo=True
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# DB Utilities


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
