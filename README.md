# 💡 MERN ThinkBoard

A full-stack interactive note-taking and idea-management application built using the MERN stack (MongoDB, Express.js, React, Node.js), featuring containerized development with Docker and automated CI/CD workflows via GitHub Actions.

---

## 🌟 Key Features

* **Interactive Board & Notes:** Create, edit, organize, and delete persistent idea boards and thoughts in real time.
* **RESTful API Architecture:** Scalable Node.js/Express backend providing endpoint routines for board creation, note tagging, and content updates.
* **Modern React UI:** Clean, responsive frontend designed for quick navigation and seamless thought organization.
* **Docker Containerization:** Containerized application setup with Docker Desktop and Docker Compose to run frontend, backend, and database services consistently.
* **Automated CI/CD Workflows:** GitHub Actions configured to run linting/formatting checks, automated tests, and Docker image builds on every commit to `main`.

---

## 🛠️ Tech Stack & Infrastructure

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS / CSS Modules, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ORM |
| **DevOps & Infra** | Docker, Docker Desktop, Docker Compose, GitHub Actions |
| **Tooling & Quality**| ESLint, Prettier, Husky |

---

## 📁 Repository Structure

```text
MERN-THINKBORD/
├── .github/
│   └── workflows/    # CI/CD pipelines (lint, test, build)
├── backend/          # Express API server, models, controllers, and routes
│   ├── Dockerfile    # Backend container definition
│   └── ...
├── frontend/         # React application frontend
│   ├── Dockerfile    # Frontend container definition
│   └── ...
├── docker-compose.yml# Container orchestration for local development
└── README.md

🚀 Getting Started
Option 1: Running with Docker Compose (Recommended)
Clone the repository:

Bash
git clone [https://github.com/Gichoz/MERN-THINKBORD.git](https://github.com/Gichoz/MERN-THINKBORD.git)
cd MERN-THINKBORD
Configure Environment Variables:
Create a .env file in the root or backend folder:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
Spin up the containers:

Bash
docker-compose up --build
Frontend: http://localhost:5173 (or http://localhost:3000)

Backend API: http://localhost:5000

Option 2: Manual Local Setup
Prerequisites
Node.js (v18+)

MongoDB (Local instance or MongoDB Atlas)

Step-by-Step Installation
Backend Setup:

Bash
cd backend
npm install
npm run dev
Frontend Setup:

Bash
cd ../frontend
npm install
npm run dev
🧪 Key API Endpoints
GET /api/boards – Retrieve all idea boards

POST /api/boards – Create a new board or note entry

PUT /api/boards/:id – Update an existing board or item

DELETE /api/boards/:id – Delete a board or note
