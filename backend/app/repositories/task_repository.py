from sqlalchemy.orm import Session

from app.models.task import Task
from app.models.user import User
from sqlalchemy import or_, func, asc, desc


def create_task(
    db: Session,
    task: Task,
):
    db.add(task)
    db.commit()
    db.refresh(task)

    return task

def get_tasks(
    db: Session,
    current_user: User,
    search: str | None = None,
    status: str | None = None,
    priority: str | None = None,
    category: str | None = None,
    page: int = 1,
    limit: int = 10,
    sort_by: str = "id",
    order: str = "asc",
):

    query = db.query(Task).filter(
        Task.owner_id == current_user.id
    )

    if search:
        query = query.filter(
            or_(
                Task.title.ilike(f"%{search}%"),
                Task.description.ilike(f"%{search}%"),
            )
        )

    if status:
        query = query.filter(
            func.lower(Task.status) == status.lower()
        )

    if priority:
        query = query.filter(
            func.lower(Task.priority) == priority.lower()
        )

    if category:
        query = query.filter(
            func.lower(Task.category) == category.lower()
        )

    sortable_columns = {
        "id": Task.id,
        "title": Task.title,
        "priority": Task.priority,
        "status": Task.status,
        "category": Task.category,
        "due_date": Task.due_date,
    }

    sort_column = sortable_columns.get(sort_by, Task.id)

    if order.lower() == "desc":
        query = query.order_by(desc(sort_column))
    else:
        query = query.order_by(asc(sort_column))

    total = query.count()

    tasks = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return total, tasks

def get_task(
    db: Session,
    task_id: int,
    current_user: User,
):
    return (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.owner_id == current_user.id
        )
        .first()
    )


def delete_task(
    db: Session,
    task: Task,
):
    db.delete(task)
    db.commit()


def update_task(
    db: Session,
    task: Task,
):
    db.commit()
    db.refresh(task)

    return task