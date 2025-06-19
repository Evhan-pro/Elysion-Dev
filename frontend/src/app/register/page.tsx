"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Menu from "../../components/Menu";
import { toast } from "react-toastify";
import { FaGoogle, FaApple } from "react-icons/fa";
import "../../styles/auth.css";         // ⬅️  Chemin à ajuster si besoin

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erreur d'inscription");

      toast.success("Compte créé avec succès !");
      setTimeout(() => router.push("/dashboard"), 3000);
    } catch (err: any) {
      toast.error(err.message || "Erreur inconnue");
    }
  };

  return (
    <div className="auth-page">
      <Menu />

      <div className="split-screen">
        {/* --------- Panneau gauche --------- */}
        <section className="left-panel">
          <div className="form-wrapper">
            <h1 className="auth-title">Inscrivez-vous</h1>
            <p className="auth-subtitle">
              Lorem ipsum dolor sit amet adipiscing elit.
            </p>

            <form onSubmit={handleRegister} className="auth-form">
              <label htmlFor="name">Nom*</label>
              <input
                id="name"
                type="text"
                placeholder="Nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label htmlFor="email">Email*</label>
              <input
                id="email"
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="password">Mot de passe*</label>
              <input
                id="password"
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label htmlFor="confirm">Confirmation du mot de passe*</label>
              <input
                id="confirm"
                type="password"
                placeholder="Confirmer le mot de passe"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />

              <button type="submit" className="primary-btn">
                S'inscrire
              </button>
            </form>

            <button className="oauth-btn google-btn" type="button">
              <FaGoogle className="icon" /> S'inscrire avec Google
            </button>
            <button className="oauth-btn apple-btn" type="button">
              <FaApple className="icon" /> S'inscrire avec Apple
            </button>

            <p className="signup-text">
              Vous avez déjà un compte ? <a href="/login">Connectez-vous !</a>
            </p>
          </div>
        </section>

        {/* --------- Panneau droit --------- */}
        <section className="right-panel">
          <Image
            src="/illustrations/register-placeholder.png"
            alt="Illustration d'inscription"
            width={280}
            height={280}
            className="illustration"
          />
        </section>
      </div>
    </div>
  );
}
