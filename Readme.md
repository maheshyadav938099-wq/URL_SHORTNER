# 🔗 URL Shortener API

A RESTful URL Shortener backend built with **Node.js**, **Express**, and **MongoDB**. It allows users to register, log in, and create shortened URLs that redirect to original long URLs.

---

## 👨‍💻 Developed By

**Mahesh Yadav**

---

## 📁 Project Structure

```
project-root/
│
├── app.js                        # Express app setup, static frontend & API routes
├── index.js                      # Server entry point
├── package.json                  # Scripts (start, dev, build)
│
├── frontend/                     # Modern React + Vite frontend
│   ├── dist/                     # Production build served by Express
│   ├── src/                      # Components, pages, context, styles
│   └── package.json              # Frontend dependencies
│
├── src/
│   ├── models/
│   │   ├── url.model.js          # Mongoose schema for shortened URLs
│   │   └── user.model.js         # Mongoose schema for users
│   │
│   ├── controllers/
│   │   ├── url.controller.js     # URL shortening & redirect logic
│   │   └── user.controller.js    # Register, login, and profile logic
│   │
│   ├── routes/
│   │   ├── auth.route.js         # Auth routes (register, login, profile)
│   │   └── url.routes.js         # URL routes (shorten, redirect)
│   │
│   └── middlewares/
│       └── auth.middleware.js    # JWT token verification middleware
```

---

## 🌐 Full-Stack Hosting & Deployment

This project is configured as a **single unified full-stack application**. When deployed, Express serves both the REST API and the React frontend on the same port!

### Quick Commands for Deployment (Render, Railway, Heroku, VPS)

| Setting | Value |
| :--- | :--- |
| **Build Command** | `npm run build` |
| **Start Command** | `npm start` |
| **Node Version** | `18+` or `20+` |

### Environment Variables required on Host:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## 🚀 Features

- **User Registration & Login** — Secure authentication using hashed passwords and JWT tokens.
- **URL Shortening** — Generate short, unique IDs for long URLs using `shortid`.
- **URL Redirection** — Visit the short URL to be redirected to the original URL.
- **Protected Routes** — Profile route is protected with JWT authentication middleware.

---

## 🛠️ Tech Stack

| Technology     | Purpose                        |
|----------------|-------------------------------|
| Node.js        | Runtime environment            |
| Express.js     | Web framework                  |
| MongoDB        | Database                       |
| Mongoose       | MongoDB ODM                    |
| bcrypt         | Password hashing               |
| jsonwebtoken   | JWT-based authentication       |
| shortid        | Short URL ID generation        |
| dotenv         | Environment variable management|

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` in the root directory, then set your MongoDB
connection string and a private JWT secret:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/urlshortener
JWT_SECRET=replace_with_a_long_random_secret
```

### 4. Start the Server

```bash
node index.js
```

Or with nodemon for development:

```bash
npx nodemon index.js
```

The server connects to MongoDB before listening on `http://localhost:3000`.

---

## 📡 API Endpoints

### 🔐 Auth Routes — `/api/users`

| Method | Endpoint            | Auth Required | Description              |
|--------|---------------------|---------------|--------------------------|
| POST   | `/api/users/register` | ❌            | Register a new user       |
| POST   | `/api/users/login`    | ❌            | Login and receive a token |
| GET    | `/api/users/profile`  | ✅ (Bearer)   | Get logged-in user info   |

---

### 🔗 URL Routes — `/`

| Method | Endpoint          | Auth Required | Description                            |
|--------|-------------------|---------------|----------------------------------------|
| POST   | `/shorturl`       | ❌            | Create a short URL                     |
| GET    | `/:shortId`       | ❌            | Redirect to original URL via short ID  |

---

## 📋 Request & Response Examples

### Register a User

**POST** `/api/users/register`

**Request Body:**
```json
{
  "username": "maheshyadav",
  "email": "mahesh@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": { ... }
}
```

---

### Login

**POST** `/api/users/login`

**Request Body:**
```json
{
  "email": "mahesh@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
```

---

### Get Profile

**GET** `/api/users/profile`

**Headers:**
```
Authorization: Bearer your_jwt_token
```

**Response:**
```json
{
  "user": {
    "_id": "...",
    "username": "maheshyadav",
    "email": "mahesh@example.com"
  }
}
```

---

### Create Short URL

**POST** `/shorturl`

**Request Body:**
```json
{
  "redirectURL": "https://www.example.com/some/very/long/url"
}
```

**Response:**
```json
{
  "message": "New url is http://localhost:3000/abc123"
}
```

---

### Redirect to Original URL

**GET** `/:shortId`

Example: `http://localhost:3000/abc123`

Redirects the browser to the original URL stored for that short ID. Returns `404` if not found.

---

## 🗄️ Database Models

### User Model (`user.model.js`)

| Field      | Type   | Required | Notes                          |
|------------|--------|----------|--------------------------------|
| username   | String | ✅       |                                |
| email      | String | ✅       | Must be unique                 |
| password   | String | ✅       | Stored as bcrypt hash          |
| sorturlid  | String | ✅       |                                |
| createdAt  | Date   | —        | Defaults to current date/time  |

> **Note:** The `password` field is excluded from query results by default using `.select("-password")`.

---

### URL Model (`url.model.js`)

| Field        | Type   | Required | Notes                          |
|--------------|--------|----------|--------------------------------|
| sorturlid    | String | ✅       | Unique short ID (from shortid) |
| redirectURL  | String | ✅       | The original long URL          |
| view_history | Array  | —        | Array of timestamp entries     |

---

## 🔒 Authentication Flow

1. User registers with `username`, `email`, and `password`.
2. Password is hashed using **bcrypt** before storing.
3. On login, password is compared with the stored hash.
4. On success, a **JWT token** (valid for 1 day) is returned.
5. Protected routes require the token as a `Bearer` token in the `Authorization` header.
6. The `authMiddleware` verifies the token and attaches `req.user` for downstream use.

---

## ⚠️ Known Issues & Suggestions

- The `user.model.js` includes a `sorturlid` field which may not be needed directly on the user — consider linking users to their URLs via a relationship instead.
- The `require: true` in the email field of `user.model.js` should be `required: true` (typo).
- The `user.controller.js` imports User from `"../src/models/user.model.js"` — verify this path matches your actual project structure.
- Error responses for duplicate user registration use status `500`; consider using `409 Conflict` for better REST semantics.
- Consider adding input validation (e.g., with `express-validator` or `Joi`) for production use.

---

## 📜 License

This project is open-source and free to use for personal and educational purposes.

---

> Built with ❤️ by **Mahesh Yadav**