import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route d'inscription
router.post("/register", registerUser);

// Route de connexion
router.post("/login", loginUser);

// Route pour récupérer les infos de l'utilisateur connecté (protégée par JWT)
router.get("/me", protect, getUserProfile);

export default router;
