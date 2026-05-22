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

router.get("/", getBlogs);
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

router.post("/upload", authMiddleware, uploadImage);

export default router;