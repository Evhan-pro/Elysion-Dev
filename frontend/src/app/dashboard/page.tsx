"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiFileText, FiUser, FiBarChart2, FiFolderPlus, FiLogOut } from "react-icons/fi";
import { FaWpforms } from "react-icons/fa";

/**
 * DashboardPage – remplace la page d'accueil pour les utilisateurs connectés.
 * Affiche des tuiles rapides vers les principales sections.
 */
export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  /* Redirige les visiteurs non connectés vers /login */
  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user]);

  if (loading || !user) return null;

  /* ---- liste des raccourcis ---- */
  const shortcuts = [
    {
      href: "/simulation",
      icon: <FiBarChart2 size={28} />,
      title: "Simuler ma retraite",
      bg: "bg-cyan-500",
    },
    {
      href: "/optimiser",
      icon: <FaWpforms size={28} />,
      title: "Optimiser ma retraite",
      bg: "bg-amber-400",
    },
    {
      href: "/bulletins",
      icon: <FiFileText size={28} />,
      title: "Mes documents",
      bg: "bg-emerald-500",
    },
    {
      href: "/profile",
      icon: <FiUser size={28} />,
      title: "Mon profil",
      bg: "bg-indigo-500",
    },
    {
      href: "/demande",
      icon: <FiFolderPlus size={28} />,
      title: "Ouvrir une demande",
      bg: "bg-pink-500",
    },
  ];

  return (
    <section className="container mx-auto py-8 px-4">
      {/* Entête */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <h1 className="text-2xl font-bold">Bienvenue, {user.name}</h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
        >
          <FiLogOut /> Déconnexion
        </button>
      </div>

      {/* Barre de recherche base de connaissances (facultatif) */}
      <div className="mb-10 max-w-xl">
        <input
          type="text"
          placeholder="Rechercher dans la base de connaissances…"
          className="w-full rounded-md border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grille de raccourcis */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shortcuts.map(({ href, icon, title, bg }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center gap-3 rounded-xl ${bg} text-white py-8 shadow-lg hover:scale-105 transition-transform`}
          >
            {icon}
            <span className="font-semibold text-center text-sm md:text-base px-2">
              {title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}