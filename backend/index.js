require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour accepter les JSON
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.send("Backend Elysion fonctionne ! 🚀");
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});
