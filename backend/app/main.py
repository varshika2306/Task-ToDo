from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError

from app.database.database import Base, engine
from app.models import User, Task

from app.routers.auth import router as auth_router
from app.routers.user import router as user_router
from app.routers.task import router as task_router
from app.routers.dashboard import router as dashboard_router

from app.core.exception_handler import (
    http_exception_handler,
    validation_exception_handler,
)

from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TaskFlow API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(
    HTTPException,
    http_exception_handler,
)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler,
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(task_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {"message": "TaskFlow API is Running!"}