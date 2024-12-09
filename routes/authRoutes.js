import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.redirect("/");
});

export default router;
