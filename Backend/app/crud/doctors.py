from sqlalchemy.orm import Session

from app.models.doctors import Doctor


def get_all_doctors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Doctor).offset(skip).limit(limit).all()
