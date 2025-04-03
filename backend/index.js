require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

// === Base de données (Sequelize / MySQL) ===
const sequelize = require("./config/database");
const User = require("./models/User");

// Synchronisation avec la base
sequelize.authenticate()
  .then(() => console.log("🗄️ Connexion MySQL réussie"))
  .catch((err) => console.error("❌ Erreur connexion MySQL :", err));

sequelize.sync() // force: true pour recréer les tables à chaque lancement (attention !)
  .then(() => console.log("📦 Tables synchronisées"))
  .catch((err) => console.error("❌ Erreur synchronisation des tables :", err));

// === Middlewares globaux ===
app.use(cors({ origin: "http://localhost:3001", methods: "GET,POST" }));
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
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// === Lancement du serveur ===
app.listen(PORT, () => {
  console.log(`✅ Serveur backend lancé sur http://localhost:${PORT}`);
});
