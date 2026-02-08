const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//  1) Static frontend FIRST
const clientPath = path.join(__dirname, "..", "..", "client");
app.use(express.static(clientPath));

// 2) API routes
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.get("/login", (req, res) => res.redirect("/login.html"));
app.get("/signup", (req, res) => res.redirect("/signup.html"));
app.get("/products", (req, res) => res.redirect("/products.html"));
app.get("/profile", (req, res) => res.redirect("/profile.html"));
app.get("/cart", (req, res) => res.redirect("/cart.html"));
app.get("/checkout", (req, res) => res.redirect("/checkout.html"));


//  3) Fallback to index.html ONLY for non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  const filePath = path.join(
    clientPath,
    req.path === "/" ? "index.html" : req.path
  );

  res.sendFile(filePath, (err) => {
    if (err) res.sendFile(path.join(clientPath, "index.html"));
  });
});


//  4) Errors
app.use(notFound);
app.use(errorHandler);

module.exports = app;
