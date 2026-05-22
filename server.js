import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

/* =========================================
   CORS
========================================= */

const allowedOrigins = [
  "https://solaye.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* =========================================
   BODY LIMITS
========================================= */

app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

/* =========================================
   ROUTES
========================================= */

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Blog API running 🚀",
  });
});

export default app;