from fastapi import Depends, Request
from sqlalchemy.orm import Session

from app.crud.users import get_user_by_id
from core.database import get_db


def get_current_user(request: Request, db: Session = Depends(get_db)):
    return get_user_by_id(db=db, user_id=request.user.id)
