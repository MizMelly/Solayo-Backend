import express from "express";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadImage,
} from "../controllers/blogController.js";

import { authMiddleware } from "../middleware/auth.js";
import upload from "../middleware/upload.js"; // ✅ IMPORTANT

const router = express.Router();

// GET BLOGS
router.get("/", getBlogs);

// CREATE BLOG
router.post("/", authMiddleware, createBlog);

// UPDATE BLOG
router.put("/:id", authMiddleware, updateBlog);

// DELETE BLOG
router.delete("/:id", authMiddleware, deleteBlog);

// UPLOAD IMAGE (FIXED)
router.post("/upload", authMiddleware, upload.single("file"), uploadImage);

export default router;