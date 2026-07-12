from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.task import Task
from app.models.user import User

from app.schemas.task import (
    TaskCreate,
    TaskUpdate,
)

from app.repositories.task_repository import (
    create_task as repo_create_task,
    get_tasks as repo_get_tasks,
    get_task as repo_get_task,
    update_task as repo_update_task,
    delete_task as repo_delete_task,
)


def create_task(
    db: Session,
    task: TaskCreate,
    current_user: User,
):
    new_task = Task(
        title=task.title,
        description=task.description,
        category=task.category,
        priority=task.priority,
        status=task.status,
        due_date=task.due_date,
        owner_id=current_user.id,
    )

    return repo_create_task(
        db=db,
        task=new_task,
    )


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

    total, tasks = repo_get_tasks(
        db=db,
        current_user=current_user,
        search=search,
        status=status,
        priority=priority,
        category=category,
        page=page,
        limit=limit,
        sort_by=sort_by,
        order=order,
    )

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "data": tasks,
    }


def get_task_by_id(
    db: Session,
    task_id: int,
    current_user: User,
):

    task = repo_get_task(
        db=db,
        task_id=task_id,
        current_user=current_user,
    )

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return task


def update_task(
    db: Session,
    task_id: int,
    task_data: TaskUpdate,
    current_user: User,
):

    task = get_task_by_id(
        db=db,
        task_id=task_id,
        current_user=current_user,
    )

    update_data = task_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(task, key, value)

    return repo_update_task(
        db=db,
        task=task,
    )


def delete_task(
    db: Session,
    task_id: int,
    current_user: User,
):

    task = get_task_by_id(
        db=db,
        task_id=task_id,
        current_user=current_user,
    )

    repo_delete_task(
        db=db,
        task=task,
    )

    return {
        "message": "Task deleted successfully"
    }