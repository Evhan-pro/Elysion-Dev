"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Menu from "../../components/Menu";
import { toast } from "react-toastify";
import { FaGoogle, FaApple } from "react-icons/fa";
import "../../styles/auth.css";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
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
        body: JSON.stringify({ email, password }), // name isn't required by the API
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erreur de connexion");

      localStorage.setItem("token", data.token);
      toast.success("Connexion réussie !");

      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (err: any) {
      toast.error(err.message || "Erreur inconnue");
    }
  };

  return (
    <div className="auth-page">
      <Menu />

      <div className="split-screen">
        {/* ------- Left side: Form ------- */}
        <section className="left-panel">
          <div className="form-wrapper">
            <h1 className="title">Connectez-vous</h1>
            <p className="subtitle">
              Lorem ipsum dolor sit amet adipiscing elit.
            </p>

            <form onSubmit={handleLogin} className="auth-form">
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
