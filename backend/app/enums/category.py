from enum import Enum


class TaskCategory(str, Enum):
    WORK = "Work"
    STUDY = "Study"
    PERSONAL = "Personal"
    HEALTH = "Health"
    FINANCE = "Finance"
    OTHERS = "Others"