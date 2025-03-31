"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUser, FiFileText } from "react-icons/fi";
import Image from "next/image";

export default function Menu() {
  const pathname = usePathname();

  return (
    <>
      {/* Menu desktop sticky haut */}
      <nav
        className="d-none d-sm-flex align-items-center justify-content-between sticky-menu px-4"
        style={{ zIndex: 9999, height: "80px" }}
      >
        {/* Liens gauche */}
        <div className="d-flex gap-4 align-items-center">
          <Link href="/simulation" className={`fw-medium text-decoration-none ${pathname === "/simulation" ? "text-primary" : "text-dark"}`}>Simulation</Link>
          <Link href="/bulletins" className={`fw-medium text-decoration-none ${pathname === "/bulletins" ? "text-primary" : "text-dark"}`}>Bulletins</Link>
        </div>

        {/* Logo centre */}
        <div className="position-absolute start-50 translate-middle-x">
        <Link href="/" className={`fw-medium text-decoration-none ${pathname === "/" ? "text-primary" : "text-dark"}`}><Image src="/logo.png" alt="Logo Elysion" width={120} height={40} /></Link>
        </div>

        {/* Boutons droite */}
        <div className="d-flex gap-3 align-items-center">
          <Link href="/login" className="btn btn-outline-primary btn-sm">Connexion</Link>
          <Link href="/register" className="btn btn-warning btn-sm text-dark fw-semibold">Inscription</Link>
        </div>
      </nav>

      {/* Menu mobile (icônes en bas) */}
      <nav
        className="d-flex d-sm-none fixed-bottom bg-white border-top justify-around py-2 shadow-sm"
        style={{ zIndex: 1050 }}
      >
        <Link href="/"><FiHome size={24} className={pathname === "/" ? "text-primary" : "text-secondary"} /></Link>
        <Link href="/simulation"><FiUser size={24} className={pathname === "/simulation" ? "text-primary" : "text-secondary"} /></Link>
        <Link href="/bulletins"><FiFileText size={24} className={pathname === "/bulletins" ? "text-primary" : "text-secondary"} /></Link>
      </nav>
    </>
  );
}
