import express from "express";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import { authMiddleware } from "../middleware/auth.js";
import upload from "../config/upload.js";

const router = express.Router();

// GET BLOGS
router.get("/", getBlogs);

// CREATE BLOG
router.post("/", authMiddleware, createBlog);

// UPDATE
router.put("/:id", authMiddleware, updateBlog);

// DELETE
router.delete("/:id", authMiddleware, deleteBlog);

// UPLOAD IMAGE (REAL FIX 🔥)
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.json({ imageUrl });
  }
);

export default router;