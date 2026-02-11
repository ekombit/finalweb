require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing in .env");

    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB connected");

    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(" Server failed:", err.message);
    process.exit(1);
  }
}

start();
