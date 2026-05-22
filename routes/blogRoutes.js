import express from "express";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadImage,
} from "../controllers/blogController.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// GET BLOGS
router.get("/", getBlogs);

// CREATE BLOG
router.post("/", authMiddleware, createBlog);

// UPDATE BLOG
router.put("/:id", authMiddleware, updateBlog);

// DELETE BLOG
router.delete("/:id", authMiddleware, deleteBlog);

// UPLOAD IMAGE (GITHUB VERSION)
router.post("/upload", authMiddleware, uploadImage);

export default router;