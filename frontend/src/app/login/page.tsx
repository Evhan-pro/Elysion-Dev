"use client";

import { useState } from "react";
import Menu from "../../components/Menu";
import "../../styles/auth.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Connexion avec", email, password);
  };

  return (
    <div className="auth-page">
      <Menu />
      <div className="container">
        <div className="auth-box">
          <h2 className="text-primary text-center mb-4">Connexion</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit">Se connecter</button>
          </form>
          <p className="text-center mt-3">
            Pas encore de compte ? <a href="/register">Créer un compte</a>
          </p>
        </div>
      </div>
    </div>
  );
}
