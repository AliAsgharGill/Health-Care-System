from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.requests.register_user import RegisterUser


def create_user(db: Session, user: RegisterUser):
    db_user = User(
        full_name=user.full_name,
        email_address=user.email_address,
        phone_number=user.phone_number,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
