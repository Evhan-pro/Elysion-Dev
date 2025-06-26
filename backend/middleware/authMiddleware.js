// backend/middleware/protect.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé, aucun token fourni" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });
    if (!req.user) throw new Error("Utilisateur introuvable");
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "Accès non autorisé, token invalide ou expiré" });
  }
};
