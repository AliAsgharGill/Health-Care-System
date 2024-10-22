from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.crud.users import (create_user, get_user_by_phone, login_user,
                            user_details)
from app.schemas.requests.register_user import LoginUser, RegisterUser
from app.schemas.requests.user_details import UserDetailSchema
from app.schemas.responses.user import UserResponse
from app.schemas.responses.user_details import ResponseUserDetailSchema
from core.database.session import get_db

user_router = APIRouter()


@user_router.post("/", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
def create_user_endpoint(user: RegisterUser, db: Session = Depends(get_db)):
    db_user = create_user(db, user)
    return db_user


# need to post user details
@user_router.post(
    "/details",
    status_code=status.HTTP_201_CREATED,
    response_model=ResponseUserDetailSchema,
)
def user_details_endpoint(user: UserDetailSchema, db: Session = Depends(get_db)):
    db_user = user_details(db, user)
    return db_user


@user_router.get("/", status_code=status.HTTP_200_OK)
def get_user_by_phone_number_endpoint(self, phone_number: str):
    return get_user_by_phone(db, phone_number)


@user_router.post(
    "/login",
)
def login_user_endpoint(user: LoginUser, db: Session = Depends(get_db)):
    return login_user(db=db, user=user)
