from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Date,
    ForeignKey,
    Enum,
)
from sqlalchemy.orm import relationship

from app.database.database import Base
from app.enums.task import TaskPriority, TaskStatus
from app.enums.category import TaskCategory


class Task(Base):
    __tablename__ = "tasks"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String(100),
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    category = Column(
        Enum(TaskCategory),
        nullable=False,
        default=TaskCategory.OTHERS
    )

    priority = Column(
        Enum(TaskPriority),
        nullable=False,
        default=TaskPriority.MEDIUM
    )

    status = Column(
        Enum(TaskStatus),
        nullable=False,
        default=TaskStatus.PENDING
    )

    due_date = Column(
        Date,
        nullable=True
    )

    owner_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    owner = relationship(
        "User",
        back_populates="tasks"
    )