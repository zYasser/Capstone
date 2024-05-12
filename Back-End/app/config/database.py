import time

import psycopg2
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base  # Updated import
from sqlalchemy.orm import sessionmaker

"""
You Need to create the database before 
"""
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:root@localhost/Capstone"



##This for testing !
# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:root@localhost/test"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# import logging

# logging.basicConfig()
# logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)
