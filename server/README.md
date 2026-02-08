README.md (в корень проекта finalweb/README.md)

Скопируй и вставь:

# TechStore (Online Shop) — Final Project

Online shop for electronics with HTML/CSS frontend + Node.js/Express REST API + MongoDB.
Includes authentication (JWT), profile management, and product CRUD (admin only).

## Tech Stack
- Frontend: HTML, CSS, Bootstrap, jQuery
- Backend: Node.js, Express
- Database: MongoDB + Mongoose
- Auth: JWT + bcrypt
- Validation: express-validator

---

## Project Structure



TechStore/
client/ # frontend (static files)
index.html
login.html
signup.html
profile.html
products.html
...
server/ # backend (REST API)
src/
controllers/
middleware/
models/
routes/
app.js
server.js
package.json
.env.example


---

## Setup & Run Locally

### 1) Clone
```bash
git clone <your-repo-url>
cd <project-folder>

2) Install server dependencies
cd server
npm install

3) Environment variables

Create server/.env based on .env.example:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret
JWT_EXPIRES_IN=7d

4) Run server
npm run dev

5) Open in browser

Frontend: http://localhost:3000/

API health: http://localhost:3000/api/health

Authentication Flow

Register: POST /api/auth/register

Login: POST /api/auth/login → returns JWT token

Use token for protected routes:
Authorization: Bearer <token>

API Documentation
Health

GET /api/health (Public)
Response: { "ok": true }

Auth (Public)

POST /api/auth/register
Body:

{ "username": "John", "email": "john@mail.com", "password": "password123", "phone": "+7 777 123 45 67" }


Response:

{ "token": "...", "user": { "id": "...", "username": "...", "email": "...", "phone": "...", "role": "user|admin" } }


POST /api/auth/login
Body:

{ "email": "john@mail.com", "password": "password123" }


Response: same as register.

Users (Private)

Requires header: Authorization: Bearer <token>

GET /api/users/profile
Response:

{ "id": "...", "username": "...", "email": "...", "phone": "...", "role": "user|admin" }


PUT /api/users/profile
Body (example):

{ "username": "New Name", "phone": "+7 777 000 00 00" }


Response: updated profile object.

Products (Private)

Requires header: Authorization: Bearer <token>

GET /api/products (User/Admin)

GET /api/products/:id (User/Admin)

Products Management (Admin Only)

Requires role=admin

POST /api/products
Body:

{ "title": "MacBook Air M3", "price": 1299, "stock": 5, "brand": "Apple", "category": "laptops", "images": ["https://..."] }


PUT /api/products/:id

DELETE /api/products/:id

Notes

First registered user becomes admin (if database users collection is empty).

.env must NOT be committed to GitHub.