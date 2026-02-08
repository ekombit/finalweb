

# 🛒 TechStore (Online Shop) — Final Project

TechStore is a comprehensive web application for electronics retail. The project features a frontend built with HTML/CSS and a robust REST API backend powered by Node.js and MongoDB.

## 🚀 Key Features
- **Authentication:** Secure Register and Login using JWT (JSON Web Tokens).
- **User Profile:** View and edit personal profile information.
- **Product Management:** Full CRUD operations for administrators.
- **Security:** Password hashing via bcrypt and input validation.

---

## 🛠 Tech Stack
- **Frontend:** HTML5, CSS3, Bootstrap 5, jQuery
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **Validation:** express-validator

---

## 📂 Project Structure

```text
TechStore/
├── frontend/             # Client-side (Static files)
│   ├── css/              # Stylesheets
│   ├── js/               # Frontend Logic (API calls, Auth)
│   ├── index.html        # Home page
│   ├── login.html        
│   ├── signup.html       
│   └── profile.html      
│
├── src/                  # Backend (REST API)
│   ├── config/           # DB Connection
│   ├── controllers/      # Request Logic
│   ├── middleware/       # Auth & Error Handlers
│   ├── models/           # Data Schemas (User, Product)
│   ├── routes/           # API Endpoints
│   ├── app.js            # Express Setup
│   └── server.js         # Entry Point
│
├── .env                  # Environment Variables (Secrets)
├── package.json          # Dependencies
└── README.md             # Documentation
```


⚙️ Setup & Run Locally1) Clone the repositoryBashgit clone <your-repo-url>
cd TechStore
2) Install dependenciesBashnpm install
3) Environment VariablesCreate a .env file in the root directory and add the following:Фрагмент кодаPORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret
JWT_EXPIRES_IN=7d
4) Run the serverDevelopment mode (with nodemon):Bashnpm run dev
5) Access the ProjectFrontend: http://localhost:3000/API Health Check: http://localhost:3000/api/health🔐 Authentication FlowRegister: POST /api/auth/registerLogin: POST /api/auth/login → returns a JWT token.Usage: For protected routes, include the token in the header:Authorization: Bearer <your_token_here>📑 API Documentation1. Auth (Public)MethodEndpointDescriptionPOST/api/auth/registerRegister new userPOST/api/auth/loginLogin and get tokenRegister Body Example:JSON{
  "username": "John",
  "email": "john@mail.com",
  "password": "password123",
  "phone": "+7 777 123 45 67"
}
2. Users (Private)Requires Header: Authorization: Bearer <token>MethodEndpointDescriptionGET/api/users/profileGet current user dataPUT/api/users/profileUpdate profile information3. ProductsMethodEndpointAccessDescriptionGET/api/productsPublicGet all productsGET/api/products/:idPublicGet single productPOST/api/productsAdminCreate new productPUT/api/products/:idAdminUpdate productDELETE/api/products/:idAdminDelete product⚠️ NotesAdmin Setup: By default, the first registered user in the database can be granted admin privileges.Security: Do NOT commit the .env file to your GitHub repository.
