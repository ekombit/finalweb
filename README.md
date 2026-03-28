# TechStore – Online Electronics Shop (Final Project)

Modern online store for electronics built with:

- **Frontend**: static HTML + CSS + Bootstrap + jQuery  
- **Backend**: Node.js + Express REST API  
- **Database**: MongoDB + Mongoose  
- **Authentication**: JWT + bcrypt  
- **Validation**: express-validator  

Features include user registration/login, profile management, product listing (with JWT), shopping cart in the browser (localStorage), checkout flow, and full CRUD for products for **admin** users (including optional import from DummyJSON on the products page).

## Tech Stack

- **Frontend**  
  HTML5, CSS3, Bootstrap 5, jQuery

- **Backend**  
  Node.js, Express

- **Database**  
  MongoDB + Mongoose ODM

- **Authentication & Security**  
  JWT (JSON Web Tokens), bcrypt, express-validator

## Project Structure

```
finalweb/
├── client/                      # Frontend – static files served by Express
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── profile.html
│   ├── products.html
│   ├── cart.html
│   ├── checkout.html
│   ├── about.html
│   └── js/
│       ├── config.js            # API base URL (localhost / Render / Vercel)
│       └── theme.js
│
├── server/                      # Backend – REST API
│   ├── server.js                # Entry: env, MongoDB, listen
│   ├── package.json
│   ├── .env                     # Local secrets (not committed)
│   ├── .env.example
│   └── src/
│       ├── app.js               # Express: static client, API routes
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       └── routes/
│
├── package.json                 # Optional: root scripts for deploy (e.g. Render)
├── render.yaml                  # Optional: Render Blueprint
└── README.md
```

## Quick Start – Local Development

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd finalweb
```

### 2. Install dependencies (backend)

```bash
cd server
npm install
```

### 3. Configure environment variables

Create `server/.env` using `.env.example` as a template:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/techstore
# or MongoDB Atlas:
# MONGO_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/techstore?retryWrites=true&w=majority
JWT_SECRET=your_very_long_and_random_secret_key_here
JWT_EXPIRES_IN=7d
```

### 4. Start the server

```bash
npm run dev
# or
npm start
# or
node server.js
```
### Live Demo

Experience the application live:

👉 https://finalweb1-vert.vercel.app/

The server listens on `PORT` from `.env`, or **5000** if omitted. Open the URL printed in the terminal (e.g. `http://localhost:3000`).

- **Frontend**: `http://localhost:<PORT>/`  
- **API health**: `http://localhost:<PORT>/api/health`

### Frontend + API on different hosts (e.g. Vercel)

The file `client/js/config.js` sets `window.API_BASE`: same-origin on **localhost** and on your **Render** URL; for static hosting on another domain it points API calls to your Render backend. Update `BACKEND_ORIGIN` there if the Render URL changes.

## API Endpoints Overview

### Health check (public)

`GET /api/health`  
→ `{ "ok": true }`

### Authentication (public)

**`POST /api/auth/register`**

Body (JSON):

```json
{
  "username": "John",
  "email": "john@example.com",
  "password": "strongpass12",
  "phone": "+7 707 123 45 67"
}
```

`phone` is optional. Password minimum length: **8** (per validation).

**`POST /api/auth/login`**

Body (JSON):

```json
{
  "email": "john@example.com",
  "password": "strongpass12"
}
```

Both success responses include:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "username": "...",
    "email": "...",
    "phone": "...",
    "role": "user"
  }
}
```

### User profile (JWT required)

Header:

```http
Authorization: Bearer <your-jwt-token>
```

- **`GET /api/users/profile`** – current user  
- **`PUT /api/users/profile`** – update `username`, `phone` (optional fields)

Example body:

```json
{
  "username": "John Updated",
  "phone": "+7 707 123 45 67"
}
```

### Products (JWT required for all routes below)

Header:

```http
Authorization: Bearer <your-jwt-token>
```

- **`GET /api/products`** – list all products  
- **`GET /api/products/:id`** – one product  

**Admin only** (`role: "admin"`):

- **`POST /api/products`** – create  
- **`PUT /api/products/:id`** – update  
- **`DELETE /api/products/:id`** – delete  

Example create body:

```json
{
  "title": "MacBook Air M3 13\"",
  "price": 1299,
  "stock": 8,
  "brand": "Apple",
  "category": "laptops",
  "images": ["https://example.com/macbook.jpg"],
  "description": "Super lightweight laptop with M3 chip"
}
```

## Important Notes

- The **first registered user** in an **empty** users collection becomes **`admin`**; the rest are `user`.  
- **Never commit** the real `server/.env` to GitHub. Use strong `JWT_SECRET` in production.  
- The frontend is served as static files from the `client/` folder by Express (`server/src/app.js`).  
- Product routes require a valid JWT; browse products in the UI after logging in.

## Deploy (short)

- **Render**: set environment variables `MONGO_URI` and `JWT_SECRET` in the dashboard; build/start can use the repo root `package.json` or run from `server/` — see `render.yaml` if present.  
- **MongoDB Atlas**: allow network access from your host (e.g. `0.0.0.0/0` for testing) so the cloud app can connect.
