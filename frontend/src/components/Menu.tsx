"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FiHome, FiUser, FiFileText } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import "../styles/menu.css";

export default function Menu() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  /* Fonction utilitaire pour colorer le lien actif */
  const active = (path: string) => (pathname === path ? "text-primary" : "text-dark");

  return (
    <>
      {/* Menu desktop (sticky en haut) */}
      <nav
        className="d-none d-sm-flex align-items-center justify-content-between sticky-menu px-4 bg-white shadow-sm"
        style={{ zIndex: 9999, height: 80 }}
      >
        {/* Logo */}
        <Link href="/" className="logo">
          <Image src="/logo.png" alt="Logo Elysion" width={120} height={40} />
        </Link>

        {/* Liens centraux */}
        <div className="nav-center d-flex gap-4">
          <Link href="/simulation" className={`fw-medium text-decoration-none ${active("/simulation")}`}>Simuler ma retraite</Link>
          <Link href="#" className={`fw-medium text-decoration-none ${active("/optimiser")}`}>Optimiser ma retraite</Link>
          <Link href="/bulletins" className={`fw-medium text-decoration-none ${active("/bulletins")}`}>Stocker mes documents</Link>
          <Link href="/contact" className={`fw-medium text-decoration-none ${active("/contact")}`}>Contact</Link>
        </div>

        {/* CTA droite : selon connexion */}
        {!loading && (
          user ? (
            <div className="d-flex align-items-center gap-3">
              <span className="fw-semibold">{user.name}</span>
              <button className="btn btn-outline-dark btn-sm" onClick={logout}>Déconnexion</button>
            </div>
          ) : (
            <div className="d-flex gap-3">
              <Link href="/login" className="btn btn-outline-dark btn-sm">Connexion</Link>
              <Link href="/register" className="btn btn-warning btn-sm text-dark fw-semibold">Inscription</Link>
            </div>
          )
        )}
      </nav>

      {/* Menu mobile (icônes en bas) */}
      <nav
        className="d-flex d-sm-none fixed-bottom bg-white border-top justify-around py-2 shadow-sm"
        style={{ zIndex: 1050 }}
      >
        <Link href="/"><FiHome size={24} className={active("/")} /></Link>
        <Link href="/simulation"><FiUser size={24} className={active("/simulation")} /></Link>
        <Link href="/bulletins"><FiFileText size={24} className={active("/bulletins")} /></Link>
      </nav>
    </>
  );
}
