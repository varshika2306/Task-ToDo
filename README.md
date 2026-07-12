# 🚀 TaskFlow – Full Stack Task Management Application

TaskFlow is a modern full-stack task management application built with **FastAPI** and **React**. It enables users to securely manage their daily tasks with authentication, dashboard analytics, filtering, searching, sorting, pagination, and profile management.

---

## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing (bcrypt)
- Auto Logout on Invalid Token

### ✅ Task Management
- Create Task
- Update Task
- Delete Task
- View Single Task
- View All Tasks

### 📊 Dashboard
- Total Tasks
- Pending Tasks
- Completed Tasks
- In Progress Tasks
- Overdue Tasks
- Priority Distribution
- Completion Percentage
- Category Statistics

### 🔍 Advanced Features
- Search Tasks
- Filter by Status
- Filter by Priority
- Sorting
- Pagination
- Category Management

### 👤 User Profile
- View Profile
- Update Name
- Update Email

### 🎨 Frontend
- Responsive UI
- Clean Minimal Design
- Light Theme
- Protected Routing
- Dashboard Cards
- Charts
- Toast Notifications

---

# 🛠 Tech Stack

## Frontend
- React
- Vite
- React Router DOM
- Axios
- React Icons
- React Hot Toast

## Backend
- FastAPI
- SQLAlchemy
- Pydantic
- SQLite
- JWT Authentication
- Passlib (bcrypt)
- Python-Jose

---

# 📂 Project Structure

```
TaskFlow/
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── database/
│   │   ├── enums/
│   │   ├── exception_handlers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   └── package.json
│
└── README.md
```

---

# 🏗 Architecture

```
React Frontend
      │
      │ Axios + JWT
      ▼
FastAPI REST API
      │
Service Layer
      │
Repository Layer
      │
SQLAlchemy ORM
      │
SQLite Database
```

---

# 🔐 Authentication Flow

```
Register
      │
      ▼
User Stored in Database
      │
      ▼
Login
      │
      ▼
JWT Token Generated
      │
      ▼
Stored in Local Storage
      │
      ▼
Authenticated API Requests
```

---

# 📈 Dashboard Analytics

The dashboard provides:

- Total Tasks
- Pending Tasks
- Completed Tasks
- In Progress Tasks
- Overdue Tasks
- Completion Rate
- Priority Distribution
- Category Statistics

---

# ⚙️ Backend Setup

Clone the repository

```bash
git clone https://github.com/<your-username>/TaskFlow.git
```

Go to backend

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate

### Windows

```bash
venv\Scripts\activate
```

### Linux/Mac

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create `.env`

```env
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

DATABASE_URL=sqlite:///./taskflow.db

APP_NAME=TaskFlow API
DEBUG=True
```

Run backend

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# 💻 Frontend Setup

Go to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run project

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register User |
| POST | `/auth/login` | Login |

---

## Users

| Method | Endpoint |
|---------|----------|
| GET | `/users/me` |
| PUT | `/users/me` |

---

## Tasks

| Method | Endpoint |
|---------|----------|
| POST | `/tasks/` |
| GET | `/tasks/` |
| GET | `/tasks/{id}` |
| PUT | `/tasks/{id}` |
| DELETE | `/tasks/{id}` |

Supports

- Search
- Filter
- Pagination
- Sorting

---

## Dashboard

| Method | Endpoint |
|---------|----------|
| GET | `/dashboard/` |

---

# 📸 Screenshots

<img width="953" height="417" alt="Screenshot 2026-07-12 162023" src="https://github.com/user-attachments/assets/c8a7d4a9-697e-4c53-b9c9-ee0cf3fa0cc3" />

<img width="959" height="443" alt="Screenshot 2026-07-12 162055" src="https://github.com/user-attachments/assets/18a755ee-0e4e-4dc4-8954-e4e3d08dff8f" />

<img width="952" height="430" alt="Screenshot 2026-07-12 162115" src="https://github.com/user-attachments/assets/35acd165-d442-4371-9fe7-c97c89c62b10" />

<img width="958" height="426" alt="Screenshot 2026-07-12 162125" src="https://github.com/user-attachments/assets/af8440ce-13f1-431e-8383-5eaeceba109b" />

<img width="396" height="437" alt="Screenshot 2026-07-12 162149" src="https://github.com/user-attachments/assets/a83b3fc6-3452-4bca-bd73-a26026b4528c" />

<img width="613" height="424" alt="Screenshot 2026-07-12 162200" src="https://github.com/user-attachments/assets/5521569e-ba82-4b74-9a1f-8992dfd12f50" />

<img width="956" height="440" alt="Screenshot 2026-07-12 155915" src="https://github.com/user-attachments/assets/0e4df60d-b335-4014-ac24-b3b78787cb34" />

<img width="781" height="428" alt="Screenshot 2026-07-12 155931" src="https://github.com/user-attachments/assets/714bcb9c-9d51-4e19-b246-ec2480a6a795" />

<img width="956" height="446" alt="Screenshot 2026-07-12 162227" src="https://github.com/user-attachments/assets/420d23df-a1a5-4ab7-9157-29d0eb4e9580" />

<img width="799" height="422" alt="Screenshot 2026-07-12 162239" src="https://github.com/user-attachments/assets/0dccc2e1-d3a5-45f5-86cd-75b17dc08e1e" />


---

# 🔒 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- CORS Enabled
- Request Validation
- Pydantic Schemas

---

# 🚀 Future Enhancements

- Email Verification
- Forgot Password
- Dark Mode
- Due Date Notifications
- Task Sharing
- File Attachments
- Docker Deployment
- PostgreSQL Support
- Unit Testing
- CI/CD Pipeline

---

# 👩‍💻 Author

**Bandi Akshitha Dhakshayani**

B.Tech – Artificial Intelligence & Machine Learning

---

# ⭐ Show Your Support

If you like this project, consider giving it a ⭐ on GitHub!

---

## License

This project is licensed under the MIT License.
