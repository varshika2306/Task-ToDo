from datetime import date

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.task import Task
from app.models.user import User
from app.enums.task import TaskPriority, TaskStatus


def get_dashboard_stats(
    db: Session,
    current_user: User,
):
    base_query = db.query(Task).filter(
        Task.owner_id == current_user.id
    )

    total_tasks = base_query.count()

    completed_tasks = base_query.filter(
        Task.status == TaskStatus.COMPLETED
    ).count()

    pending_tasks = base_query.filter(
        Task.status == TaskStatus.PENDING
    ).count()

    in_progress_tasks = base_query.filter(
        Task.status == TaskStatus.IN_PROGRESS
    ).count()

    high_priority_tasks = base_query.filter(
        Task.priority == TaskPriority.HIGH
    ).count()

    medium_priority_tasks = base_query.filter(
        Task.priority == TaskPriority.MEDIUM
    ).count()

    low_priority_tasks = base_query.filter(
        Task.priority == TaskPriority.LOW
    ).count()

    overdue_tasks = base_query.filter(
        Task.due_date < date.today(),
        Task.status != TaskStatus.COMPLETED,
    ).count()

    completion_rate = (
        round((completed_tasks / total_tasks) * 100, 2)
        if total_tasks > 0
        else 0.0
    )

    category_counts = (
        db.query(
            Task.category,
            func.count(Task.id)
        )
        .filter(Task.owner_id == current_user.id)
        .group_by(Task.category)
        .all()
    )

    categories = {
        category.value: count
        for category, count in category_counts
    }

    return {
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks,
        "in_progress_tasks": in_progress_tasks,
        "high_priority_tasks": high_priority_tasks,
        "medium_priority_tasks": medium_priority_tasks,
        "low_priority_tasks": low_priority_tasks,
        "overdue_tasks": overdue_tasks,
        "completion_rate": completion_rate,
        "categories": categories,
    }