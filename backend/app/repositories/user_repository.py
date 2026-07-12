from sqlalchemy.orm import Session

from app.models.user import User


def get_current_user_profile(
    db: Session,
    current_user: User,
):
    return (
        db.query(User)
        .filter(User.id == current_user.id)
        .first()
    )


def get_user_by_email(
    db: Session,
    email: str,
):
    return (
        db.query(User)
        .filter(User.email == email)
        .first()
    )


def update_user(
    db: Session,
    user: User,
):
    db.commit()
    db.refresh(user)

    return user