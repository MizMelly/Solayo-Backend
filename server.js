import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ MUST be first
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://solaye.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 🔥 IMPORTANT for preflight (THIS FIXES YOUR ERROR)
app.options("*", cors());

app.use(express.json({ limit: "10mb" })); // also fixes upload issues

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Blog API running 🚀");
});

export default app;