"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaGoogle, FaApple } from "react-icons/fa";
import "@/styles/auth.css";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* Si déjà connecté → dashboard */
  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Erreur de connexion");

    /* 1️⃣  stocke le token + met le profil dans le contexte */
    login(data.token, { id: data.id, name: data.name, email: data.email });

    /* 2️⃣  toast + redirection */
    toast.success("Connexion réussie !");
    router.replace("/dashboard");
  } catch (err: any) {
    toast.error(err.message || "Erreur inconnue");
  }
};


  return (
    <div className="auth-page">

      <div className="split-screen">
        {/* ------- Left side: Form ------- */}
        <section className="left-panel">
          <div className="form-wrapper">
            <h1 className="title">Connectez-vous</h1>
            <p className="subtitle">
              Lorem ipsum dolor sit amet adipiscing elit.
            </p>

            <form onSubmit={handleLogin} className="auth-form">

              <label htmlFor="email">Email*</label>
              <input
                id="email"
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="password-label-row">
                <label htmlFor="password">Mot de passe*</label>
                <a href="/forgot-password" className="forgot-link">
                  Mot de passe oublié ?
                </a>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="primary-btn">
                Connectez-vous
              </button>
            </form>

            <button className="oauth-btn google-btn" type="button">
              <FaGoogle className="icon" /> Se connecter avec Google
            </button>

            <button className="oauth-btn apple-btn" type="button">
              <FaApple className="icon" /> Se connecter avec Apple
            </button>

            <p className="signup-text">
              Vous n'avez pas de compte ? <a href="/register">Inscrivez-vous !</a>
            </p>
          </div>
        </section>

        {/* ------- Right side: Illustration ------- */}
        <section className="right-panel">
          <Image
            src="/illustrations/login-placeholder.png"
            alt="Illustration de connexion"
            width={280}
            height={280}
            className="illustration"
          />
        </section>
      </div>
    </div>
  );
}
