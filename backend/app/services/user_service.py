from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserUpdate

from app.repositories.user_repository import (
    get_current_user_profile as repo_get_profile,
    get_user_by_email as repo_get_user_by_email,
    update_user as repo_update_user,
)

from app.schemas.user import (
    UserUpdate,
    ChangePassword,
)

from app.core.security import (
    verify_password,
    hash_password,
)


def get_my_profile(
    db: Session,
    current_user: User,
):
    user = repo_get_profile(db, current_user)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return user


def update_my_profile(
    db: Session,
    user_data: UserUpdate,
    current_user: User,
):
    user = repo_get_profile(db, current_user)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    existing_user = repo_get_user_by_email(
        db,
        user_data.email,
    )

    if existing_user and existing_user.id != current_user.id:
        raise HTTPException(
            status_code=400,
            detail="Email already exists.",
        )

    user.name = user_data.name
    user.email = user_data.email

    return repo_update_user(
        db,
        user,
    )

def change_my_password(
    db: Session,
    password_data: ChangePassword,
    current_user: User,
):
    user = repo_get_profile(
        db,
        current_user,
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    if not verify_password(
        password_data.current_password,
        user.password,
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect.",
        )

    user.password = hash_password(
        password_data.new_password
    )

    repo_update_user(
        db,
        user,
    )

    return {
        "message": "Password changed successfully."
    }