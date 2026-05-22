import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://solaye.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// routes
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Blog API running 🚀");
});

export default app;