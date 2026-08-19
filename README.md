<div align="center">

# 🤖 GemNova — AI Chatbot Application

### A production-ready, full-stack AI chatbot inspired by ChatGPT
### Built with React.js · Node.js · MongoDB · Google Gemini AI

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-19c37d?style=for-the-badge)](https://gemnova-frontend.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-View_Code-black?style=for-the-badge&logo=github)](https://github.com/tanyatomar167/gemnova-chatbot)

![React](https://img.shields.io/badge/React.js-20232A?style=flat&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React.js-20232A?style=flat&logo=react&logoColor=61DAFB)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)
![UI/UX](https://img.shields.io/badge/UI%2FUX_Basics-19c37d?style=flat&logo=figma&logoColor=white)

</div>

---

## 📌 What is GemNova?

GemNova is a **full-stack AI chatbot application** built from scratch — from UI design to backend APIs to cloud deployment. It lets users have intelligent conversations powered by **Google Gemini 2.5 Flash**, with all conversations saved to a personal account in **MongoDB Atlas**.

The goal was to replicate the core experience of ChatGPT while learning and implementing every layer of a modern web application — authentication, REST APIs, database design, containerization, and automated deployment.

---

## 🌐 Live Application

| | Link |
|---|---|
| 🚀 Live App | https://gemnova-frontend.onrender.com |
| 💻 Source Code | https://github.com/tanyatomar167/gemnova-chatbot |

> **Note:** App is hosted on Render free tier — first load may take 30–60 seconds to wake up the backend.

---

## ✨ Features

### 🔐 User Authentication
- Register and login with email and password
- Passwords hashed using **bcrypt** (10 salt rounds)
- Sessions managed with **JWT tokens** (7-day expiry)
- Each user sees only their own conversations
- Auto logout when token expires

### 💬 AI Chat
- Real-time responses from **Google Gemini 2.5 Flash**
- **4 Chat Modes** — changes AI behavior per mode:
  - ⚡ Default — Fast, concise answers
  - 🧠 Deep Think — Step-by-step detailed explanations
  - 💻 Code Assistant — Clean, commented code examples
  - ✍️ Creative — Vivid, imaginative writing
- Smooth **typing animation** (character by character)
- **Markdown formatting** — bold, italic, code blocks, numbered lists, headings

### 🗂️ Thread Management
- All conversations saved automatically in MongoDB
- **Rename** any thread with a single click
- **Search** through all your past conversations instantly
- **Delete** conversations you no longer need
- Click any thread to reload full conversation history
- New chat button to start fresh anytime

### 🎨 UI / UX
- Dark theme inspired by ChatGPT
- Animated **loading dots** while AI is thinking
- **Auto-scroll** to latest message
- Press **Enter** to send, Shift+Enter for new line
- Responsive input box that grows with text
- Active thread highlighted in sidebar
- Hover to reveal rename and delete buttons

---

## 🛠️ Tech Stack — Why Each Was Chosen

| Layer | Technology | Why |
|---|---|---|
| Markup | **HTML5** | Semantic structure, accessible markup |
| Styling | **CSS3** | Flexbox layout, CSS variables for theming, animations |
| UI/UX | **Visual Design, Responsive UI** | Dark theme, typing animation, mode badges, clean layout |
| Frontend | **JavaScript (ES6+)** | Core language — async/await, fetch, DOM, context |
| Framework | **React.js** | Component-based UI, hooks, React Context global state |
| Version Control | **Git + GitHub** | Branching, commits, push/pull, GitHub Actions |
| Backend | **Node.js + Express.js** | Fast, lightweight, JavaScript end-to-end |
| Database | **MongoDB Atlas** | Flexible schema for chat messages, cloud hosted |
| ODM | **Mongoose** | Schema validation, easy querying |
| Auth | **JWT + bcrypt** | Stateless auth, secure password storage |
| AI | **Google Gemini API** | Free tier, powerful, fast responses |
| Container | **Docker** | Consistent environment across machines |
| CI/CD | **GitHub Actions** | Auto build and deploy on every push |
| Hosting | **Render** | Free tier, supports Node + static sites |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   BROWSER                        │
│           React.js (Vite)                        │
│   Login → Context API → Chat UI → Sidebar        │
└──────────────────┬──────────────────────────────┘
                   │ HTTPS REST API
                   │ Authorization: Bearer TOKEN
┌──────────────────▼──────────────────────────────┐
│               EXPRESS.JS SERVER                  │
│                                                  │
│  /api/auth  → Register / Login                   │
│  /api/thread → GET threads (user-scoped)         │
│  /api/chat   → POST message → Gemini → save      │
│                                                  │
│  middleware/auth.js → JWT verification           │
└──────────┬───────────────┬──────────────────────┘
           │               │
┌──────────▼──────┐  ┌─────▼───────────────────────┐
│  MONGODB ATLAS  │  │    GOOGLE GEMINI API          │
│  users          │  │    gemini-2.5-flash           │
│  threads        │  │    System prompts per mode    │
│  messages[]     │  └─────────────────────────────┘
└─────────────────┘
```

---

## 📁 Project Structure

```
gemnova-chatbot/
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD — auto deploy on push
│
├── Backend/
│   ├── middleware/
│   │   └── auth.js             # JWT verification middleware
│   ├── models/
│   │   ├── User.js             # User schema (name, email, hashed password)
│   │   └── Thread.js           # Thread schema (userId, title, messages[])
│   ├── routes/
│   │   ├── auth.js             # POST /register, POST /login
│   │   └── chat.js             # GET/POST/PATCH/DELETE thread routes
│   ├── utils/
│   │   └── gemini.js           # Gemini API call with mode-based prompts
│   ├── Dockerfile
│   ├── server.js               # Express app, CORS, MongoDB connect
│   └── package.json
│
├── Frontend/frontend/
│   ├── src/
│   │   ├── App.jsx             # Auth check, theme state, routing
│   │   ├── App.css             # Global reset + CSS theme variables
│   │   ├── MyContext.jsx       # All API calls + global state
│   │   ├── Login.jsx           # Register / Sign In UI
│   │   ├── Login.css
│   │   ├── sidebar.jsx         # Thread list, search, rename, delete
│   │   ├── sidebar.css
│   │   ├── chatwindow.jsx      # Navbar, input bar, send logic
│   │   ├── chatwindow.css
│   │   ├── chat.jsx            # Message bubbles, typing effect, markdown
│   │   ├── chat.css
│   │   ├── Dropdown.jsx        # Mode selector with close-on-outside-click
│   │   └── Dropdown.css
│   ├── Dockerfile
│   ├── vite.config.js          # Proxy /api to backend in dev
│   └── package.json
│
├── docker-compose.yml          # Run both services together locally
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Option 1 — Run Locally

**Prerequisites:** Node.js v18+, MongoDB Atlas account, Gemini API key

```bash
# 1. Clone
git clone https://github.com/tanyatomar167/gemnova-chatbot.git
cd gemnova-chatbot

# 2. Backend setup
cd Backend
npm install

# Create Backend/.env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/gemnova
GEMINI_API_KEY=your_gemini_key_here
JWT_SECRET=any_random_secret_string

node server.js
# ✅ server running on 8080
# ✅ Connected with Database!

# 3. Frontend setup (new terminal)
cd Frontend/frontend
npm install

# Create Frontend/frontend/.env
VITE_API_URL=http://localhost:8080

npm run dev
# ✅ http://localhost:5173
```

### Option 2 — Run with Docker

```bash
# From root folder
docker-compose up --build

# Frontend → http://localhost:80
# Backend  → http://localhost:8080
```

---

## 🔌 API Reference

### Authentication (Public)

| Method | Endpoint | Body | Response |
|---|---|---|---|
| POST | `/api/auth/register` | `{name, email, password}` | `{token, user}` |
| POST | `/api/auth/login` | `{email, password}` | `{token, user}` |

### Chat & Threads (Protected — send `Authorization: Bearer TOKEN`)

| Method | Endpoint | Body | Response |
|---|---|---|---|
| GET | `/api/thread` | — | Array of threads |
| GET | `/api/thread/:threadId` | — | Array of messages |
| POST | `/api/chat` | `{threadId, message, mode}` | `{reply}` |
| PATCH | `/api/thread/:threadId/rename` | `{title}` | `{success, title}` |
| DELETE | `/api/thread/:threadId` | — | `{success}` |

---

## 🔐 Security Implementation

### Password Security
```
User registers with password "tanya123"
                    ↓
bcrypt.hash("tanya123", 10)
                    ↓
"$2b$10$xK9mN2pL..." → saved in MongoDB
                    ↓
Original password NEVER stored
Even if DB is hacked → passwords are safe
```

### JWT Authorization
```
User logs in → backend creates token:
{
  userId: "abc123",     ← identifies who
  iat: 1234567890,      ← issued at
  exp: 1234567890       ← expires in 7 days
}
Signed with JWT_SECRET → sent to browser

Every request:
Header: Authorization: Bearer eyJhbGci...
                    ↓
middleware reads token → jwt.verify()
                    ↓
extracts userId → req.userId
                    ↓
only fetch data WHERE userId matches
User A can NEVER see User B's threads ✅
```

---

## ⚙️ CI/CD Pipeline

```
Developer pushes code to GitHub main branch
                    ↓
GitHub Actions workflow triggers automatically
                    ↓
┌─────────────────────────────────┐
│  Job 1: Test Backend            │
│  → npm install                  │
│  → verify dependencies          │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│  Job 2: Build Frontend          │
│  → npm install                  │
│  → npm run build                │
│  → verify dist/ generated       │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│  Job 3: Deploy (if jobs pass)   │
│  → Trigger Render backend hook  │
│  → Trigger Render frontend hook │
└──────────────┬──────────────────┘
               ↓
App live at gemnova-frontend.onrender.com ✅
```

---

## 🐳 Docker Setup

### Why Docker?
```
Without Docker: "works on my machine" problem
With Docker: same environment everywhere

Your app runs identically on:
→ Your laptop
→ Your teammate's Mac
→ Linux server on Render
→ Any cloud provider
```

### Dockerfile — Backend (multi-layer optimization)
```dockerfile
FROM node:18-alpine        # lightweight base image
WORKDIR /app
COPY package*.json ./
RUN npm install            # cache this layer
COPY . .                   # copy code after install
EXPOSE 8080
CMD ["node", "server.js"]
```

### docker-compose — run both services
```bash
docker-compose up --build   # first time
docker-compose up           # after that
docker-compose down         # stop
```

---

## 🌍 Deployment Architecture

```
GitHub Repo
    │
    ├── GitHub Actions CI/CD
    │       ↓ on push to main
    │
    ├── Render (Backend — Web Service)
    │   ├── Runtime: Node.js
    │   ├── Root: Backend/
    │   ├── Start: node server.js
    │   └── Env: MONGODB_URI, GEMINI_API_KEY, JWT_SECRET
    │
    └── Render (Frontend — Static Site)
        ├── Root: Frontend/frontend
        ├── Build: npm run build
        ├── Publish: dist/
        └── Env: VITE_API_URL
```

---

## 🎭 Chat Modes — How They Work

Each mode sends a different **system prompt** to Gemini before the user's message:

```javascript
const systemPrompts = {
  "Default":        "You are a helpful assistant. Answer clearly.",
  "Deep Think":     "Think step by step. Explain in full detail.",
  "Code Assistant": "You are a coding expert. Provide commented code.",
  "Creative":       "Use vivid, imaginative, engaging language.",
};

// Full prompt sent to Gemini:
`${systemPrompts[mode]}\n\nUser: ${userMessage}`
```

Same question → different mode → completely different answer style.

---

## 🔧 Known Limitations

```
⚠️  Render free tier sleeps after 15 min inactivity
    First load = 30-60 sec wake-up time
    Solution: upgrade to paid tier for production

⚠️  No message streaming yet
    Full reply appears after complete generation
    Solution: implement SSE (Server-Sent Events)

⚠️  No image upload support yet
    Text-only conversations for now
```

---

## 👩‍💻 Author

**Tanya Tomar**
B.Tech Computer Science & Engineering — RKGIT Ghaziabad (2027)

[![GitHub](https://img.shields.io/badge/GitHub-tanyatomar167-black?style=flat&logo=github)](https://github.com/tanyatomar167)

---

<div align="center">
Made with ❤️ by Tanya Tomar
<br/><br/>
⭐ <strong>Star this repo if you found it helpful!</strong>
</div>
