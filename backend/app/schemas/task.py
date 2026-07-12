from datetime import date
from typing import Optional

from pydantic import BaseModel, field_validator

from app.enums.task import TaskPriority, TaskStatus
from app.enums.category import TaskCategory


# ----------------------------
# Create Task Schema
# ----------------------------
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: TaskCategory = TaskCategory.OTHERS
    priority: TaskPriority = TaskPriority.MEDIUM
    status: TaskStatus = TaskStatus.PENDING
    due_date: Optional[date] = None

    # ---------- Title ----------
    @field_validator("title")
    @classmethod
    def validate_title(cls, value):
        value = value.strip()

        if len(value) < 3:
            raise ValueError("Title must contain at least 3 characters.")

        if len(value) > 100:
            raise ValueError("Title cannot exceed 100 characters.")

        return value

    # ---------- Description ----------
    @field_validator("description")
    @classmethod
    def validate_description(cls, value):
        if value is None:
            return value

        value = value.strip()

        if len(value) > 500:
            raise ValueError("Description cannot exceed 500 characters.")

        return value

    # ---------- Due Date ----------
    @field_validator("due_date")
    @classmethod
    def validate_due_date(cls, value):
        if value is None:
            return value

        if value < date.today():
            raise ValueError("Due date cannot be in the past.")

        return value
    
    @field_validator("category", mode="before")
    @classmethod
    def normalize_category(cls, value):
        if isinstance(value, str):
            mapping = {
                "work": "Work",
                "study": "Study",
                "personal": "Personal",
                "health": "Health",
                "finance": "Finance",
                "others": "Others",
                }
            
            return mapping.get(value.strip().lower(), value)
        
        return value

    # ---------- Priority ----------
    @field_validator("priority", mode="before")
    @classmethod
    def normalize_priority(cls, value):
        if isinstance(value, str):
            mapping = {
                "low": "Low",
                "medium": "Medium",
                "high": "High",
            }

            return mapping.get(value.strip().lower(), value)

        return value

    # ---------- Status ----------
    @field_validator("status", mode="before")
    @classmethod
    def normalize_status(cls, value):
        if isinstance(value, str):
            mapping = {
                "pending": "Pending",
                "in progress": "In Progress",
                "completed": "Completed",
            }

            return mapping.get(value.strip().lower(), value)

        return value


# ----------------------------
# Update Task Schema
# ----------------------------
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[TaskCategory] = None
    priority: Optional[TaskPriority] = None
    status: Optional[TaskStatus] = None
    due_date: Optional[date] = None

    # ---------- Title ----------
    @field_validator("title")
    @classmethod
    def validate_title(cls, value):
        if value is None:
            return value

        value = value.strip()

        if len(value) < 3:
            raise ValueError("Title must contain at least 3 characters.")

        if len(value) > 100:
            raise ValueError("Title cannot exceed 100 characters.")

        return value
    
    @field_validator("category", mode="before")
    @classmethod
    def normalize_category(cls, value):
        if value is None:
            return value
        
        if isinstance(value, str):
            mapping = {
                "work": "Work",
                "study": "Study",
                "personal": "Personal",
                "health": "Health",
                "finance": "Finance",
                "others": "Others",
                }
            
            return mapping.get(value.strip().lower(), value)
        
        return value

    # ---------- Description ----------
    @field_validator("description")
    @classmethod
    def validate_description(cls, value):
        if value is None:
            return value

        value = value.strip()

        if len(value) > 500:
            raise ValueError("Description cannot exceed 500 characters.")

        return value

    # ---------- Due Date ----------
    @field_validator("due_date")
    @classmethod
    def validate_due_date(cls, value):
        if value is None:
            return value

        if value < date.today():
            raise ValueError("Due date cannot be in the past.")

        return value

    # ---------- Priority ----------
    @field_validator("priority", mode="before")
    @classmethod
    def normalize_priority(cls, value):
        if value is None:
            return value

        if isinstance(value, str):
            mapping = {
                "low": "Low",
                "medium": "Medium",
                "high": "High",
            }

            return mapping.get(value.strip().lower(), value)

        return value

    # ---------- Status ----------
    @field_validator("status", mode="before")
    @classmethod
    def normalize_status(cls, value):
        if value is None:
            return value

        if isinstance(value, str):
            mapping = {
                "pending": "Pending",
                "in progress": "In Progress",
                "completed": "Completed",
            }

            return mapping.get(value.strip().lower(), value)

        return value


# ----------------------------
# Response Schema
# ----------------------------
class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    category: TaskCategory
    priority: TaskPriority
    status: TaskStatus
    due_date: Optional[date]
    owner_id: int

    class Config:
        from_attributes = True