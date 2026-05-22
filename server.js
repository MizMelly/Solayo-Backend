import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// __dirname fix (IMPORTANT)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://solaye.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());

// 🔥 THIS IS WHAT YOU WERE MISSING
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Blog API running 🚀");
});

// debug env
console.log("==== ENV CHECK ====");
console.log("EMAIL:", process.env.ADMIN_EMAIL);
console.log("PASSWORD:", process.env.ADMIN_PASSWORD);
console.log("SECRET:", process.env.JWT_SECRET);
console.log("===================");

const PORT = process.env.PORT || 5000;

export default app;