from sqlalchemy.orm import Session

from app.models.user import User

from app.repositories.dashboard_repository import (
    get_dashboard_stats as repo_dashboard,
)


def get_dashboard(
    db: Session,
    current_user: User,
):

    return repo_dashboard(
        db,
        current_user,
    )