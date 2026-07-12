from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependency import get_db
from app.core.oauth2 import get_current_user

from app.models.user import User

from app.schemas.user import (
    UserResponse,
    UserUpdate,
)

from app.services.user_service import (
    get_my_profile,
    update_my_profile,
)

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get(
    "/me",
    response_model=UserResponse,
)
def get_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_my_profile(
        db=db,
        current_user=current_user,
    )

@router.put(
    "/me",
    response_model=UserResponse,
)
def update_profile(
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_my_profile(
        db=db,
        user_data=user,
        current_user=current_user,
    )