# 🤖 GemNova — AI Chatbot Application

> A full-stack AI-powered chatbot application built with React, Node.js, MongoDB, and Google Gemini AI. Inspired by ChatGPT's design and functionality.

![GemNova Banner](https://img.shields.io/badge/GemNova-AI%20Chatbot-19c37d?style=for-the-badge&logo=robot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

---

## 🌐 Live Demo

**🚀 [https://gemnova-frontend.onrender.com](https://gemnova-frontend.onrender.com)**

---

## 📸 Screenshots

### Login Page
> Clean and minimal authentication UI with Sign In / Sign Up toggle

### Chat Interface
> ChatGPT-inspired dark theme with sidebar thread history and AI replies

---

## ✨ Features

- 🔐 **User Authentication** — Register and login with JWT tokens
- 🔒 **Authorization** — Each user sees only their own threads
- 💬 **Real-time AI Chat** — Powered by Google Gemini 2.5 Flash
- 🧵 **Thread History** — All conversations saved in MongoDB
- ✏️ **Rename Threads** — Double click to rename any conversation
- 🔍 **Search Threads** — Search through your conversation history
- 🗑️ **Delete Threads** — Remove conversations you no longer need
- 🎭 **Multiple Modes** — Default, Deep Think, Code Assistant, Creative
- ⌨️ **Typing Animation** — Smooth character-by-character response effect
- 📝 **Markdown Formatting** — Bold, italic, code blocks, lists in replies
- 🌙 **Dark Theme** — Beautiful dark UI matching ChatGPT aesthetics
- 📱 **Auto Scroll** — Automatically scrolls to latest message
- 🔄 **New Chat** — Create fresh conversations anytime

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI Framework |
| Vite | Build Tool |
| CSS3 | Styling with CSS Variables |
| Font Awesome | Icons |
| React Context API | Global State Management |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB Atlas | Database |
| Mongoose | ODM for MongoDB |
| JWT (jsonwebtoken) | Authentication Tokens |
| bcryptjs | Password Hashing |
| Google Gemini AI | AI Response Generation |
| dotenv | Environment Variables |
| cors | Cross Origin Resource Sharing |

### Deployment
| Service | Purpose |
|---|---|
| Render (Web Service) | Backend Hosting |
| Render (Static Site) | Frontend Hosting |
| MongoDB Atlas | Cloud Database |

---

## 🏗️ Project Structure

```
gemnova-chatbot/
│
├── Backend/
│   ├── middleware/
│   │   └── auth.js          # JWT token verification
│   ├── models/
│   │   ├── User.js          # User schema (name, email, password)
│   │   └── Thread.js        # Thread schema (messages, userId)
│   ├── routes/
│   │   ├── auth.js          # Register and Login routes
│   │   └── chat.js          # Chat, thread CRUD routes
│   ├── utils/
│   │   └── gemini.js        # Google Gemini API integration
│   ├── server.js            # Express app entry point
│   └── package.json
│
└── Frontend/
    └── frontend/
        ├── src/
        │   ├── App.jsx          # Root component with auth check
        │   ├── App.css          # Global styles + theme variables
        │   ├── MyContext.jsx    # Global state management
        │   ├── Login.jsx        # Authentication page
        │   ├── Login.css
        │   ├── sidebar.jsx      # Thread history sidebar
        │   ├── sidebar.css
        │   ├── chatwindow.jsx   # Main chat area
        │   ├── chatwindow.css
        │   ├── chat.jsx         # Message rendering + typing effect
        │   ├── chat.css
        │   ├── Dropdown.jsx     # Mode selector dropdown
        │   └── Dropdown.css
        ├── vite.config.js
        └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key

### 1. Clone the repository
```bash
git clone https://github.com/tanyatomar167/gemnova-chatbot.git
cd gemnova-chatbot
```

### 2. Setup Backend
```bash
cd Backend
npm install
```

Create `.env` file in Backend folder:
```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_secret_key
```

Start backend:
```bash
node server.js
```

### 3. Setup Frontend
```bash
cd Frontend/frontend
npm install
```

Create `.env` file in Frontend/frontend folder:
```env
VITE_API_URL=http://localhost:8080
```

Start frontend:
```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login existing user |

### Chat (Protected — requires JWT token)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/thread` | Get all threads for logged-in user |
| GET | `/api/thread/:threadId` | Get messages for a specific thread |
| POST | `/api/chat` | Send message and get AI reply |
| PATCH | `/api/thread/:threadId/rename` | Rename a thread |
| DELETE | `/api/thread/:threadId` | Delete a thread |

---

## 🔐 Authentication Flow

```
1. User registers → password hashed with bcrypt
2. JWT token created with userId inside
3. Token stored in localStorage
4. Every API request sends token in Authorization header
5. Backend middleware verifies token
6. Only returns data belonging to that user
7. Token expires in 7 days → auto logout
```

---

## 🎭 Chat Modes

| Mode | Description |
|---|---|
| Default | Fast and helpful responses |
| Deep Think | Detailed step-by-step explanations |
| Code Assistant | Clean, commented code examples |
| Creative | Vivid, imaginative language |

---

## 🌍 Deployment

### Backend on Render
- **Root Directory:** `Backend`
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- **Environment Variables:** `MONGODB_URI`, `GEMINI_API_KEY`, `JWT_SECRET`

### Frontend on Render
- **Root Directory:** `Frontend/frontend`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- **Environment Variables:** `VITE_API_URL`

---

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ JWT tokens with expiry (7 days)
- ✅ Protected API routes with middleware
- ✅ User-scoped data (cannot access other users' threads)
- ✅ CORS restricted to frontend URL
- ✅ Environment variables for all sensitive keys
- ✅ `.env` files not committed to GitHub

---

## 📚 What I Learned

- Full stack application architecture
- REST API design with Express.js
- MongoDB schema design with Mongoose
- JWT Authentication and Authorization
- Password security with bcrypt hashing
- React Context API for global state
- Integrating third-party AI APIs (Gemini)
- Deployment on cloud platforms (Render)
- Git version control and GitHub
- CORS, environment variables, security best practices

---

## 👩‍💻 Author

**Tanya Tomar**

[![GitHub](https://img.shields.io/badge/GitHub-tanyatomar167-black?style=flat&logo=github)](https://github.com/tanyatomar167)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ by Tanya Tomar
  <br/>
  <strong>⭐ Star this repo if you found it helpful!</strong>
</div>
