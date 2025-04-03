"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Menu from "../../components/Menu";
import "../../styles/auth.css";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erreur de connexion");

      localStorage.setItem("token", data.token);

      toast.success("Connexion réussie !");
      setTimeout(() => {
        router.push("/dashboard"); // redirection après 3 secondes
      }, 3000);
    } catch (err: any) {
      toast.error(err.message || "Erreur inconnue");
    }
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
