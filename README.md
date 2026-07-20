# 📝 TaskFlow – Python To-Do List Application

A full-stack Python-based To-Do List application that enables users to organize and manage daily tasks efficiently. The application supports user authentication, task creation, updating, completion tracking, deletion, and persistent data storage through a database.

---

# 📌 Project Objective

The objective of this project is to develop a To-Do List application that allows users to manage their daily activities efficiently. The application provides complete CRUD (Create, Read, Update, Delete) functionality along with secure user authentication and persistent storage.

---

---

# 🚀 Live Demo

## Frontend
🔗 https://task-to-do-drab.vercel.app/

## Backend API
🔗 https://task-todo-y4p5.onrender.com

---


# ✨ Features

- ✅ User Registration & Login
- ✅ Create New Tasks
- ✅ View All Tasks
- ✅ Update Existing Tasks
- ✅ Mark Tasks as Completed
- ✅ Delete Tasks
- ✅ Persistent Data Storage using SQLite
- ✅ Secure Authentication using JWT
- ✅ RESTful API Documentation (Swagger UI)
- ✅ Responsive React Frontend

---

# 🛠️ Technologies Used

## Backend
- Python 3
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Uvicorn

## Frontend
- React
- Vite
- CSS

---

# 📂 Project Structure

```
TaskFlow/
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Functional Requirements Implemented

| Requirement | Status |
|------------|--------|
| Add New Task | ✅ |
| Display Tasks | ✅ |
| Update Task | ✅ |
| Mark Task as Completed | ✅ |
| Delete Task | ✅ |
| Persistent Storage | ✅ SQLite Database |
| Automatic Data Loading | ✅ |
| Input Validation | ✅ |
| Exception Handling | ✅ |

---

# 🔄 Project Workflow

### User Authentication

1. Register a new account
2. Login securely
3. Receive JWT Access Token
4. Access protected task APIs

### Task Management

1. Create Task
2. View All Tasks
3. Edit Task
4. Mark Task Complete
5. Delete Task

All changes are automatically saved in the database.

---

# 🚀 Installation

## Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🧪 Testing Checklist

- ✔ Register User
- ✔ Login User
- ✔ Create Task
- ✔ View Tasks
- ✔ Update Task
- ✔ Mark Task Completed
- ✔ Delete Task
- ✔ Data Persistence after Restart

---



---

# 🔮 Future Enhancements

- Task Priorities
- Due Dates
- Search Tasks
- Filter by Status
- Dark Mode
- Email Reminders
- Calendar Integration
- Cloud Database
- Docker Deployment

---

# 📚 Learning Outcomes

- REST API Development
- Full Stack Development
- CRUD Operations
- Authentication using JWT
- Database Integration
- API Testing with Swagger
- React Frontend Development
- FastAPI Backend Development

---

# 💼 Resume Description

Developed a full-stack Python Task Management application using FastAPI, React, SQLAlchemy, and SQLite. Implemented secure JWT authentication, complete CRUD functionality, REST APIs, responsive user interface, and persistent database storage.

---

# 👩‍💻 Author

**Varshika**

Artificial Intelligence & Machine Learning Student
