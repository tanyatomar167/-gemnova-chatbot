<div align="center">

# 🤖 GemNova

### AI-Powered Chatbot Application

*A full-stack ChatGPT-inspired chatbot built with React, Node.js, MongoDB, and Google Gemini AI.*
*Containerized with Docker · Orchestrated with Kubernetes · Automated with GitHub Actions CI/CD*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-gemnova--frontend.onrender.com-19c37d?style=for-the-badge)](https://gemnova-frontend.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-tanyatomar167-black?style=for-the-badge&logo=github)](https://github.com/tanyatomar167/-gemnova-chatbot)

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=flat)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens)

</div>

---

## 📌 Table of Contents

- [About](#-about)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Docker Setup](#-docker-setup)
- [CI/CD Pipeline](#%EF%B8%8F-cicd-pipeline)
- [Kubernetes](#-kubernetes)
- [API Endpoints](#-api-endpoints)
- [Authentication Flow](#-authentication-flow)
- [Security](#-security)
- [Author](#-author)

---

## 📖 About

GemNova is a **production-grade full-stack AI chatbot** inspired by ChatGPT. It uses **Google Gemini 2.5 Flash** to generate intelligent responses and **MongoDB Atlas** to persist all conversations. The application includes full user authentication with JWT, multiple AI chat modes, and a complete DevOps pipeline.

This project was built to demonstrate end-to-end software development skills — from designing a React UI to deploying with Docker and orchestrating with Kubernetes.

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| 🖥️ Frontend | [gemnova-frontend.onrender.com](https://gemnova-frontend.onrender.com) |
| ⚙️ Backend API | [gemnova-chatbot-1.onrender.com](https://gemnova-chatbot-1.onrender.com) |

> ⚠️ **Note:** App is on Render free tier. Backend may take **30–60 seconds** to wake up on first visit. Refresh if blank.

---

## ✨ Features

### 💬 Chat Features
| Feature | Description |
|---|---|
| 🤖 AI Chat | Real-time responses from Google Gemini 2.5 Flash |
| 🎭 4 Chat Modes | Default · Deep Think · Code Assistant · Creative |
| ⌨️ Typing Effect | Character-by-character response animation |
| 📝 Markdown | Bold, italic, code blocks, numbered lists formatted |
| 📜 Auto Scroll | Chat auto-scrolls to latest message |

### 🧵 Thread Management
| Feature | Description |
|---|---|
| 💾 Save History | All conversations saved to MongoDB |
| ✏️ Rename Threads | Click to rename any conversation |
| 🔍 Search Threads | Search through thread titles in sidebar |
| 🗑️ Delete Threads | Remove conversations permanently |
| ➕ New Chat | Start fresh conversation anytime |

### 🔐 Authentication
| Feature | Description |
|---|---|
| 📝 Register | Create account with name, email, password |
| 🔑 Login | Secure login with JWT token |
| 🔒 Authorization | Users see only their own threads |
| 🚪 Logout | Clears token and session |
| ♻️ Persistent Login | Token stored in localStorage, stays logged in |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React.js | 18+ | UI Framework |
| Vite | 5+ | Build tool |
| React Context API | — | Global state management |
| CSS3 + Variables | — | Theming and styling |
| Font Awesome | 6.5 | Icons |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express.js | 4+ | Web framework |
| MongoDB Atlas | — | Cloud database |
| Mongoose | 8+ | ODM for MongoDB |
| jsonwebtoken | — | JWT tokens |
| bcryptjs | — | Password hashing |
| Google Gemini AI | 2.5 Flash | AI responses |
| cors | — | Cross-origin requests |
| dotenv | — | Environment variables |

### DevOps
| Tool | Purpose |
|---|---|
| Terminal (Linux/Bash) | Command line operations |
| Git | Version control |
| GitHub | Remote repository, collaboration |
| Docker | Containerization |
| Docker Compose | Multi-container local development |
| GitHub Actions | CI/CD pipeline automation |
| Kubernetes (kubectl) | Container orchestration and scaling |
| Render | Cloud hosting (frontend + backend) |

---

## 🏗️ Project Structure

```
gemnova-chatbot/
│
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD pipeline
│
├── k8s/
│   ├── backend-deployment.yaml     # Kubernetes backend config (2 replicas)
│   └── frontend-deployment.yaml    # Kubernetes frontend config (2 replicas)
│
├── Backend/
│   ├── Dockerfile                  # Docker image — Node 18 Alpine
│   ├── .dockerignore
│   ├── middleware/
│   │   └── auth.js                 # JWT token verification middleware
│   ├── models/
│   │   ├── User.js                 # User schema (name, email, hashed password)
│   │   └── Thread.js               # Thread schema (messages[], userId)
│   ├── routes/
│   │   ├── auth.js                 # POST /register, POST /login
│   │   └── chat.js                 # GET/POST/PATCH/DELETE thread routes
│   ├── utils/
│   │   └── gemini.js               # Gemini API integration with mode prompts
│   ├── server.js                   # Express entry point
│   └── package.json
│
├── Frontend/frontend/
│   ├── Dockerfile                  # Multi-stage build (Node → nginx)
│   ├── src/
│   │   ├── App.jsx                 # Root — auth check, theme state
│   │   ├── App.css                 # Global styles + CSS theme variables
│   │   ├── MyContext.jsx           # Global state (threads, auth, API calls)
│   │   ├── Login.jsx               # Sign In / Sign Up page
│   │   ├── Login.css
│   │   ├── sidebar.jsx             # Thread list, search, rename, delete
│   │   ├── sidebar.css
│   │   ├── chatwindow.jsx          # Navbar, input bar, mode selector
│   │   ├── chatwindow.css
│   │   ├── chat.jsx                # Message bubbles, typing effect, markdown
│   │   ├── chat.css
│   │   ├── Dropdown.jsx            # Mode selector dropdown
│   │   └── Dropdown.css
│   ├── vite.config.js
│   └── package.json
│
├── docker-compose.yml              # Run frontend + backend together locally
├── .gitignore                      # Excludes node_modules, .env, dist
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com))
- Docker Desktop (optional, for Docker setup)

### Option 1 — Run with Node.js

**1. Clone the repo**
```bash
git clone https://github.com/tanyatomar167/-gemnova-chatbot.git
cd gemnova-chatbot
```

**2. Setup Backend**
```bash
cd Backend
npm install
```

Create `Backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gemnova
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=any_random_secret_string
PORT=8080
```

Start backend:
```bash
node server.js
# Server running on 8080
# Connected with Database!
```

**3. Setup Frontend**
```bash
cd Frontend/frontend
npm install
```

Create `Frontend/frontend/.env`:
```env
VITE_API_URL=http://localhost:8080
```

Start frontend:
```bash
npm run dev
# App running at http://localhost:5173
```

### Option 2 — Run with Docker

```bash
git clone https://github.com/tanyatomar167/-gemnova-chatbot.git
cd gemnova-chatbot
```

Create `.env` at root:
```env
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_key
JWT_SECRET=your_secret
```

```bash
docker compose up --build
# Frontend → http://localhost
# Backend  → http://localhost:8080
```

---

## 🐳 Docker Setup

### Dockerfile — Backend (`Backend/Dockerfile`)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "server.js"]
```

### Dockerfile — Frontend (`Frontend/frontend/Dockerfile`)
```dockerfile
# Stage 1 — Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 — Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose Commands
```bash
docker compose up --build     # build and start
docker compose up -d          # run in background
docker compose down           # stop everything
docker compose logs           # view logs
```

---

## ⚙️ CI/CD Pipeline

### GitHub Actions — `.github/workflows/deploy.yml`

Every push to `main` branch triggers the pipeline automatically:

```
📦 Push to GitHub (main branch)
         ↓
🔧 Job 1: Test Backend
   → Checkout code
   → Setup Node 18
   → npm install (Backend)
         ↓
🏗️ Job 2: Build Frontend
   → Checkout code
   → Setup Node 18
   → npm install (Frontend)
   → npm run build (Vite)
         ↓
🚀 Job 3: Deploy (only if Jobs 1+2 pass)
   → Trigger Render backend deploy hook
   → Trigger Render frontend deploy hook
         ↓
✅ Live app updated automatically
```

**Benefits:**
- Zero manual deployment needed
- Failed builds block deployment automatically
- Every commit is tested before going live
- GitHub Secrets keep API keys safe

---

## ☸️ Kubernetes

### Deploy to Kubernetes
```bash
# apply all configs
kubectl apply -f k8s/

# check running pods
kubectl get pods
```

**Expected output (2 replicas running):**
```
NAME                               READY   STATUS    RESTARTS   AGE
gemnova-backend-6cb48c9758-2kjrr   1/1     Running   0          14m
gemnova-backend-6cb48c9758-bmdvp   1/1     Running   0          14m
```

### Scaling
```bash
# scale up to 5 replicas (high traffic)
kubectl scale deployment gemnova-backend --replicas=5

# verify scaling
kubectl get pods
# 5 pods now Running

# scale back to 2
kubectl scale deployment gemnova-backend --replicas=2
# 3 pods Terminating gracefully — zero downtime
```

### Other useful commands
```bash
kubectl get services              # view services
kubectl logs deployment/gemnova-backend   # view logs
kubectl describe pod <pod-name>   # pod details
kubectl delete -f k8s/            # remove all
```

**Kubernetes advantages demonstrated:**
- ✅ High availability with 2 replicas
- ✅ Zero-downtime scaling (tested 2 → 5 → 2)
- ✅ Auto-restart if pod crashes
- ✅ Load balancing across replicas

---

## 🔌 API Endpoints

### Auth Routes (Public)
| Method | Endpoint | Body | Response |
|---|---|---|---|
| POST | `/api/auth/register` | `{name, email, password}` | `{token, user}` |
| POST | `/api/auth/login` | `{email, password}` | `{token, user}` |

### Chat Routes (Protected — Bearer Token required)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/thread` | Get all threads for logged-in user |
| GET | `/api/thread/:threadId` | Get messages for a specific thread |
| POST | `/api/chat` | Send message, get Gemini reply |
| PATCH | `/api/thread/:threadId/rename` | Rename a thread |
| DELETE | `/api/thread/:threadId` | Delete a thread |

**Protected route usage:**
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Flow

```
REGISTER:
User fills form → POST /api/auth/register
→ bcrypt.hash(password, 10)     [hashed, never plain]
→ User saved to MongoDB
→ jwt.sign({userId}, JWT_SECRET, {expiresIn: "7d"})
→ Token returned to frontend
→ Saved in localStorage

LOGIN:
User enters credentials → POST /api/auth/login
→ Find user by email in MongoDB
→ bcrypt.compare(password, storedHash)
→ If match → new JWT token created
→ Token returned and saved in localStorage

EVERY PROTECTED REQUEST:
Frontend sends: Authorization: Bearer <token>
→ middleware/auth.js reads token
→ jwt.verify(token, JWT_SECRET)
→ Extracts userId → req.userId
→ Route handler filters data by userId
→ User A cannot access User B's threads ✅

TOKEN EXPIRY:
Token expires after 7 days
→ Next request returns 401
→ localStorage cleared
→ Login page shown automatically
```

---

## 🔒 Security

| Security Measure | Implementation |
|---|---|
| Password hashing | bcrypt with 10 salt rounds |
| Authentication | JWT tokens (7 day expiry) |
| Authorization | Middleware on every protected route |
| Data isolation | All queries filter by `userId` |
| CORS restriction | Only frontend URL whitelisted |
| Secret management | `.env` files never committed to GitHub |
| Container secrets | Kubernetes secrets for env variables |
| GitHub Secrets | API keys stored as repository secrets |

---

## 📁 Key Files Explained

| File | What it does |
|---|---|
| `MyContext.jsx` | Global state — threads, auth, all API calls |
| `middleware/auth.js` | Reads JWT from header, extracts userId |
| `routes/chat.js` | All chat CRUD — protected with verifyToken |
| `routes/auth.js` | Register and Login — creates JWT |
| `utils/gemini.js` | Calls Gemini API with mode-specific prompts |
| `models/Thread.js` | MongoDB schema — stores userId with thread |
| `models/User.js` | MongoDB schema — stores hashed password |
| `deploy.yml` | GitHub Actions CI/CD workflow |
| `k8s/*.yaml` | Kubernetes deployment manifests |
| `docker-compose.yml` | Runs frontend + backend locally |

---

## 🎭 Chat Modes

| Mode | System Prompt Style | Best For |
|---|---|---|
| Default | Helpful and concise | General questions |
| Deep Think | Step-by-step detailed | Complex topics |
| Code Assistant | Clean commented code | Programming help |
| Creative | Vivid imaginative language | Writing and stories |

---

## 📚 What This Project Demonstrates

```
Full Stack     → React + Node.js + Express + MongoDB
AI Integration → Google Gemini API with custom prompts
Authentication → JWT + bcrypt full implementation
Authorization  → Middleware-based route protection
Containerization → Docker + multi-stage builds
Orchestration  → Kubernetes scaling and deployment
CI/CD          → GitHub Actions automated pipeline
Cloud Deploy   → Render with env vars and secrets
Security       → CORS, secrets management, data isolation
Git Workflow   → Feature commits, meaningful messages
```

---

## 👩‍💻 Author

**Tanya Tomar**
B.Tech CSE Student | RKGIT, Ghaziabad (2027) | Full Stack + DevOps

[![GitHub](https://img.shields.io/badge/GitHub-tanyatomar167-black?style=flat&logo=github)](https://github.com/tanyatomar167)
[![Live Project](https://img.shields.io/badge/Live-GemNova-19c37d?style=flat)](https://gemnova-frontend.onrender.com)

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

<div align="center">
  <strong>Made with ❤️ by Tanya Tomar</strong>
  <br/><br/>
  <i>If this project helped you, please ⭐ star the repo!</i>
</div>