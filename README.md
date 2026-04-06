# Auth Dashboard

A production-ready full-stack authentication system with a dashboard built with Node.js, Express, MongoDB, React, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 5+ (local or Atlas)

### Backend Setup

```bash
cd server
npm install
```

Create `.env` file:
```
MONGO_URI=mongodb://localhost:27017/auth-app
JWT_SECRET=your_secret_key_here_change_in_production
PORT=5000
```

Start server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## 📋 API Endpoints

**Auth:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

**User (Protected):**
- `GET /api/user/me` - Get current user profile
- `PATCH /api/user/update` - Update user details

**Utility:**
- `GET /api/health` - Health check

## 🔐 Features

✅ JWT authentication with 7-day expiry
✅ Bcrypt password hashing
✅ Zod input validation
✅ Protected routes (backend + frontend)
✅ Auto-logout on token expiry
✅ Tailwind CSS responsive UI
✅ Error handling middleware
✅ CORS enabled
✅ Async/await everywhere
✅ Production-ready code

## 📁 Project Structure

**Backend:**
```
server/
├── config/db.js
├── controllers/authController.js
├── models/User.js
├── routes/auth.js
├── middleware/auth.js
├── validators/authValidator.js
├── utils/jwt.js
└── server.js
```

**Frontend:**
```
client/src/
├── components/PrivateRoute.jsx
├── context/AuthContext.jsx
├── pages/Login.jsx
├── pages/Register.jsx
├── pages/Dashboard.jsx
├── services/api.js
└── App.jsx
```

## 🔑 Test Credentials

After registering a user, use those credentials to login.

Example registration:
- Username: `testuser`
- Email: `test@example.com`
- Password: `password123`
- Age: `25`
- Year: `2nd`
- Department: `Engineering`

## ⚡ Key Features Explained

**JWT Token Management:**
- Token stored in localStorage and Context
- Auto-attached to requests via Axios interceptor
- Auto-logout on 401 response

**Protected Dashboard:**
- Only accessible with valid token
- Displays user profile
- Allows profile updates
- Logout functionality

**Security:**
- Passwords hashed with bcrypt
- JWT with 7-day expiry
- CORS configured
- Input validation on both sides
- Error handling prevents info leaks
