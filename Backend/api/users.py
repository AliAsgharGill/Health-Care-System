from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.crud.users import create_user
from app.schemas.requests.register_user import RegisterUser
from app.schemas.responses.user import UserResponse
from core.database.session import get_db

user_router = APIRouter()


@user_router.post("/", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
def create_user_endpoint(user: RegisterUser, db: Session = Depends(get_db)):
    db_user = create_user(db, user)
    return db_user
