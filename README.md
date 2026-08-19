# 🤖 GemNova — AI Chatbot Application

<div align="center">

### A ChatGPT-inspired full-stack AI chatbot 

**React.js · JavaScript · Node.js · Express.js · MongoDB · Google Gemini AI**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-19c37d?style=for-the-badge)](https://gemnova-frontend.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-View_Code-black?style=for-the-badge&logo=github)](https://github.com/tanyatomar167/gemnova-chatbot)

![React](https://img.shields.io/badge/React.js-20232A?style=flat&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)

</div>

---

## 📌 About the Project

GemNova is a **full-stack AI chatbot application** inspired by the core experience of ChatGPT.

The application allows users to create an account, start conversations with an AI assistant, manage previous conversations, and switch between different chat modes.

The project was built to strengthen practical skills in **MERN-style full-stack development, JavaScript, REST APIs, database management, authentication, API integration, and UI/UX design**.

---

## 🌐 Live Application

| Resource | Link |
|---|---|
| 🚀 Live Demo | https://gemnova-frontend.onrender.com |
| 💻 GitHub Repository | https://github.com/tanyatomar167/gemnova-chatbot |

> **Note:** The application is hosted on Render's free tier, so the first request may take some time while the backend wakes up.

---

# ✨ Features

## 🔐 Authentication

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- User-specific conversation history
- Automatic logout when authentication expires

## 💬 AI Chat

- AI responses powered by Google Gemini 2.5 Flash
- Multiple conversation modes
- Typing animation for AI responses
- Markdown formatting
- Code blocks and formatted responses
- New conversation creation

### 🎭 Available Chat Modes

| Mode | Purpose |
|---|---|
| ⚡ Default | General-purpose conversations |
| 🧠 Deep Think | Detailed explanations |
| 💻 Code Assistant | Programming and technical help |
| ✍️ Creative | Creative and imaginative responses |

---

# 🗂️ Conversation Management

Users can:

- Create new conversations
- View previous conversations
- Rename conversations
- Search conversations
- Delete conversations
- Open and continue previous conversations

All conversations are associated with the authenticated user and stored in MongoDB.

---

# 🎨 UI / UX

The interface is designed around a simple and familiar chatbot experience.

### UI Features

- 🌙 Dark-themed interface
- 📱 Responsive layout
- 💬 Chat-style message interface
- ⌨️ Auto-growing message input
- ⚡ Typing animation
- 🔍 Thread search
- ✏️ Rename interaction
- 🗑️ Delete interaction
- 🎭 Chat mode selector
- 📜 Automatic scroll to latest message
- 🖱️ Hover interactions
- 🔄 Loading states

The frontend focuses on **clean layout, usability, responsive behavior, and interactive components**.

---

# 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React.js, JavaScript, HTML5, CSS3 |
| **UI / UX** | Responsive UI, CSS animations, Dark Theme, Interactive Components |
| **Backend** | Node.js, Express.js |
| **API** | REST APIs |
| **Database** | MongoDB Atlas |
| **ODM** | Mongoose |
| **Authentication** | JWT, bcrypt |
| **AI Integration** | Google Gemini API |
| **Version Control** | Git, GitHub |
| **Deployment** | Render |

---

# 🧠 What I Learned

This project helped me gain practical experience with:

### Frontend Development

- Building reusable React components
- React Hooks
- React Context API
- Managing application state
- Handling API requests
- Creating responsive interfaces
- CSS layouts and animations
- User interaction and UI states

### Backend Development

- Building REST APIs using Express.js
- Creating authentication APIs
- JWT authentication middleware
- Request/response handling
- Error handling
- Connecting backend with MongoDB

### Database

- MongoDB database design
- Mongoose schemas and models
- Storing users and conversations
- Querying user-specific data
- Managing embedded message data

### JavaScript

- ES6+ syntax
- Async/Await
- Promises
- Fetch API
- Array methods
- Object handling
- State and event management

---

# 🏗️ Application Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    │      Browser         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      React.js        │
                    │   Chat Interface     │
                    │   Context / State    │
                    └──────────┬───────────┘
                               │
                         REST API Calls
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │      Backend         │
                    └───────┬───────┬──────┘
                            │       │
                ┌───────────┘       └────────────┐
                ▼                                ▼
       ┌─────────────────┐             ┌─────────────────┐
       │  MongoDB Atlas  │             │  Gemini API     │
       │                 │             │                 │
       │ Users           │             │ AI Responses    │
       │ Threads         │             │ Chat Modes      │
       │ Messages        │             │                 │
       └─────────────────┘             └─────────────────┘
```

---

# 📁 Project Structure

```text
gemnova-chatbot/
│
├── Backend/
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Thread.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── chat.js
│   │
│   ├── utils/
│   │   └── gemini.js
│   │
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   └── frontend/
│       ├── src/
│       │   ├── App.jsx
│       │   ├── MyContext.jsx
│       │   ├── Login.jsx
│       │   ├── sidebar.jsx
│       │   ├── chatwindow.jsx
│       │   ├── chat.jsx
│       │   └── Dropdown.jsx
│       │
│       ├── App.css
│       ├── vite.config.js
│       └── package.json
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# 🔌 REST API

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

## Conversations

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/thread` | Get user's conversations |
| GET | `/api/thread/:id` | Get conversation messages |
| POST | `/api/chat` | Send message and receive AI response |
| PATCH | `/api/thread/:id/rename` | Rename conversation |
| DELETE | `/api/thread/:id` | Delete conversation |

Protected endpoints require:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

# 🔐 Authentication Flow

```text
User
 │
 ▼
Register / Login
 │
 ▼
Backend validates credentials
 │
 ▼
Password hashed with bcrypt
 │
 ▼
JWT token generated
 │
 ▼
Frontend stores authentication token
 │
 ▼
Token sent with protected API requests
 │
 ▼
JWT middleware verifies token
 │
 ▼
User-specific conversations returned
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have:

- Node.js 18+
- MongoDB Atlas account
- Google Gemini API key
- Git

## 1. Clone Repository

```bash
git clone https://github.com/tanyatomar167/gemnova-chatbot.git
cd gemnova-chatbot
```

## 2. Backend Setup

```bash
cd Backend
npm install
```

Create:

```text
Backend/.env
```

Add:

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
node server.js
```

Backend:

```text
http://localhost:8080
```

## 3. Frontend Setup

Open another terminal:

```bash
cd Frontend/frontend
npm install
```

Create:

```text
Frontend/frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:8080
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔒 Security

- Passwords are hashed using bcrypt
- JWT is used for authentication
- Protected routes verify authentication tokens
- User conversations are scoped to the authenticated user
- API keys are stored in environment variables
- `.env` files are excluded from Git

> Never commit API keys, database credentials, JWT secrets, or other sensitive information to GitHub.

---

# 🌍 Deployment

The application is deployed using:

| Part | Platform |
|---|---|
| Frontend | Render |
| Backend | Render |
| Database | MongoDB Atlas |

The live application is available here:

**https://gemnova-frontend.onrender.com**

---

# 🔮 Future Improvements

- [ ] Streaming AI responses
- [ ] Image upload and multimodal conversations
- [ ] Message editing
- [ ] Regenerate AI response
- [ ] Conversation export
- [ ] Improved mobile UI
- [ ] Voice input
- [ ] More AI models
- [ ] User profile customization

---

# 👩‍💻 Author

### Tanya Tomar

**B.Tech Computer Science & Engineering — RKGIT Ghaziabad**

Interested in:

**Full-Stack Development · JavaScript · UI/UX · AI Applications**

[![GitHub](https://img.shields.io/badge/GitHub-tanyatomar167-black?style=flat&logo=github)](https://github.com/tanyatomar167)

---

<div align="center">

### ⭐ If you found this project interesting, consider starring the repository!

Made with ❤️ by **Tanya Tomar**

</div>
