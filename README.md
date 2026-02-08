# TechStore – Online Electronics Shop (Final Project)

Modern online store for electronics built with:

- **Frontend**: Static HTML + CSS + Bootstrap + jQuery  
- **Backend**: Node.js + Express REST API  
- **Database**: MongoDB + Mongoose  
- **Authentication**: JWT + bcrypt  
- **Validation**: express-validator

Features include user registration/login, profile management, product browsing, and full CRUD for products (admin only).

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
TechStore/
├── client/                 # Frontend – static files served by Express
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── profile.html
│   ├── products.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── server/                 # Backend – REST API
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```
text## Quick Start – Local Development

### 1. Clone the repository

bash
git clone <your-repository-url>
cd TechStore
2. Install dependencies (backend)
Bashcd server
npm install
3. Configure environment variables
Create file server/.env using .env.example as template:
envPORT=3000
MONGO_URI=mongodb://localhost:27017/techstore
# or use MongoDB Atlas: mongodb+srv://user:pass@cluster0...
JWT_SECRET=your_very_long_and_random_secret_key_here
JWT_EXPIRES_IN=7d
4. Start the server
Bashnpm run dev
# or
node server.js
The server runs on http://localhost:3000 by default.
Frontend will be available at:
→ http://localhost:3000/
API health check:
→ http://localhost:3000/api/health
API Endpoints Overview
Health Check (Public)

GET /api/health
→ { "ok": true }

Authentication (Public)

POST /api/auth/register
Body:JSON{
  "username": "John",
  "email": "john@example.com",
  "password": "strongpass123",
  "phone": "+77771234567"
}
POST /api/auth/login
Body:JSON{
  "email": "john@example.com",
  "password": "strongpass123"
}

Both return:
JSON{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "...", "username": "...", "email": "...", "phone": "...", "role": "user" }
}
User Profile (Protected – requires JWT)

GET /api/users/profile
PUT /api/users/profile
Example body:JSON{
  "username": "John Updated",
  "phone": "+77001234567"
}

Header:
textAuthorization: Bearer <your-jwt-token>
Products (Mostly Protected)

GET /api/products              – all products (public or auth)
GET /api/products/:id          – single product

Admin only (role: "admin"):

POST /api/products
PUT /api/products/:id
DELETE /api/products/:id

Example create body:
JSON{
  "title": "MacBook Air M3 13\"",
  "price": 1299,
  "stock": 8,
  "brand": "Apple",
  "category": "laptops",
  "images": ["https://example.com/macbook.jpg"],
  "description": "Super lightweight laptop with M3 chip"
}

#Important Notes

The very first registered user automatically becomes admin (if the users collection is empty).
Never commit .env file to GitHub!
Use a strong JWT_SECRET in production.
Frontend is served as static files from /client folder by Express.
