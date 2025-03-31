"use client";

import { useState } from "react";
import Menu from "../../components/Menu";
import "../../styles/auth.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    console.log("Création du compte", email);
  };

  return (
    <div className="auth-page">
      <Menu />
      <div className="container">
        <div className="auth-box">
          <h2 className="text-primary text-center mb-4">Créer un compte</h2>
          <form onSubmit={handleRegister}>
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
