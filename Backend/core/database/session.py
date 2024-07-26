from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# from ..config import config
from core.config import config

SQLALCHEMY_DATABASE_URL = config.POST_GRESQL

# FOR SQLIITE3
# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
# )

# FOR POSTGRESQL
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
