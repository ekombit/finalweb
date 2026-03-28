const fs = require("fs");
const path = require("path");

// Load .env from server/ even when `node server/server.js` is run from repo root (Render, etc.)
require("dotenv").config({ path: path.join(__dirname, ".env") });

const mongoose = require("mongoose");
const app = require("./src/app");

const PORT = Number(process.env.PORT) || 5000;

const clientPath = path.join(__dirname, "..", "client");

function logStartup() {
  console.log("[startup] Node", process.version, "| cwd", process.cwd());
  console.log(
    "[startup] MONGO_URI:",
    process.env.MONGO_URI ? "set (hidden)" : "MISSING — add in Render → Environment"
  );
  console.log(
    "[startup] JWT_SECRET:",
    process.env.JWT_SECRET ? "set (hidden)" : "MISSING — add in Render → Environment"
  );
  console.log(
    "[startup] client folder:",
    clientPath,
    fs.existsSync(clientPath) ? "OK" : "MISSING (push client/ to GitHub)"
  );
}

async function start() {
  logStartup();

  try {
    if (!fs.existsSync(clientPath)) {
      console.warn(
        "[startup] client/ missing next to server/ — site UI may 404. Commit folder finalweb/client to the repo."
      );
    }

    if (!process.env.MONGO_URI) {
      console.error(
        "[startup] MONGO_URI is not set. Render: Dashboard → your Web Service → Environment → add MONGO_URI."
      );
      process.exit(1);
    }
    if (!process.env.JWT_SECRET) {
      console.error(
        "[startup] JWT_SECRET is not set. Render: Environment → add JWT_SECRET (long random string, e.g. openssl rand -hex 32)."
      );
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 20_000
    });
    console.log("[startup] MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log("[startup] Listening on 0.0.0.0:" + PORT);
    });
  } catch (err) {
    console.error("[startup] Failed:", err && err.message ? err.message : err);
    if (err && err.stack) console.error(err.stack);
    process.exit(1);
  }
}

start();
