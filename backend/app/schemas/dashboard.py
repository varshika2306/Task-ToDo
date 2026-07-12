from pydantic import BaseModel


class DashboardResponse(BaseModel):
    total_tasks: int

    completed_tasks: int
    pending_tasks: int
    in_progress_tasks: int

    high_priority_tasks: int
    medium_priority_tasks: int
    low_priority_tasks: int

    overdue_tasks: int

    completion_rate: float

    categories: dict[str, int]