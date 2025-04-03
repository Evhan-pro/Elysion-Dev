"use client";

import { useState } from "react";
import Menu from "../../components/Menu";
import "../../styles/auth.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription");
      }
  
      alert("Inscription réussie !");
      console.log("Utilisateur inscrit :", data);
      // Redirige vers la page de connexion
    } catch (error: any) {
      alert(error.message);
    }
  };  

  return (
    <div className="auth-page">
      <Menu />
      <div className="container">
        <div className="auth-box">
          <h2 className="text-primary text-center mb-4">Créer un compte</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <button type="submit">Créer mon compte</button>
          </form>
          <p className="text-center mt-3">
            Déjà un compte ? <a href="/login">Se connecter</a>
          </p>
        </div>
      </div>
    </div>
  );
}
