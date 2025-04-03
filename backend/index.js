import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import axios from "axios";

import sequelize from "./config/database.js";
import User from "./models/User.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// === Middlewares globaux ===
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// === Route de test ===
app.get("/", (req, res) => {
  res.send("Backend Elysion fonctionne ! 🚀");
});

// === Route Hugging Face IA ===
const HF_MODEL_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

app.post("/api/chatbot", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Veuillez poser une question." });
  }

  try {
    const response = await axios.post(
      HF_MODEL_URL,
      {
        inputs: `Tu es un expert en investissement et retraite. Réponds uniquement aux questions financières. Question : ${message}`,
      },
      {
        headers: { Authorization: `Bearer ${HF_API_KEY}` },
      }
    );

    res.json({ response: response.data[0].generated_text });
  } catch (error) {
    console.error("Erreur avec Hugging Face:", error);
    res.status(500).json({ error: "Impossible de récupérer une réponse." });
  }
});

// === Routes Auth ===
app.use("/api/auth", authRoutes);

// === Connexion à la BDD et lancement du serveur ===
sequelize.authenticate()
  .then(() => console.log("🗄️ Connexion MySQL réussie"))
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Serveur backend lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erreur au démarrage :", err);
  });
