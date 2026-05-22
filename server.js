import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS (must be FIRST)
app.use(cors({
  origin: ["https://solaye.vercel.app", "http://localhost:5173"],
  credentials: true,
}));

app.options("*", cors());

// ✅ IMPORTANT: increase limits (fix upload + JSON crash)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// routes
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Blog API running 🚀");
});

export default app;