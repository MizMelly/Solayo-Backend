import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN REQUEST:", email, password);

  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "solayo1234";

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { email, role: "admin" },
    process.env.JWT_SECRET,   
    { expiresIn: "1d" }
  );

  return res.json({ token });
});

export default router;