from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependency import get_db
from app.core.oauth2 import get_current_user
from app.models.user import User
from typing import Optional
from app.schemas.common import PaginatedResponse

from app.schemas.task import (
    TaskCreate,
    TaskUpdate,
    TaskResponse,
)

from app.services.task_service import (
    create_task,
    get_tasks,
    get_task_by_id,
    update_task,
    delete_task,
)

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


@router.post(
    "/",
    response_model=TaskResponse
)
def create_new_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_task(
        db=db,
        task=task,
        current_user=current_user,
    )
@router.get(
    "/",
    response_model=PaginatedResponse[TaskResponse]
)
def get_all_tasks(
    search: str | None = None,
    status: str | None = None,
    priority: str | None = None,
    category: str | None = None,
    page: int = 1,
    limit: int = 10,
    sort_by: str = "id",
    order: str = "asc",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return get_tasks(
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

@router.get(
    "/{task_id}",
    response_model=TaskResponse
)
def get_single_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_task_by_id(
        db=db,
        task_id=task_id,
        current_user=current_user,
    )


@router.put(
    "/{task_id}",
    response_model=TaskResponse
)
def update_existing_task(
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_task(
        db=db,
        task_id=task_id,
        task_data=task,
        current_user=current_user,
    )


@router.delete("/{task_id}")
def remove_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return delete_task(
        db=db,
        task_id=task_id,
        current_user=current_user,
    )