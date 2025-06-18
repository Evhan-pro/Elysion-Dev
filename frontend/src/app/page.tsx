"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Menu from "../components/Menu";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import Image from 'next/image';
import AvatarSalarie from "@/components/icons/SalariéIcon";
import AvatarPatron from "@/components/icons/PatronIcon";
import AvatarFreelance from "@/components/icons/FreelanceIcon";

const MapChart = dynamic(() => import("../components/MapChart"), { ssr: false });

export default function HomePage() {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowMenu(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="position-relative min-vh-100 text-white">
      {/* En-tête avec logo et navigation */}
      <header className="position-fixed w-100 top-0 z-3 px-4 py-3 d-flex justify-content-between align-items-center">
        <div className="logo">
          <Link href="/" className="text-white text-decoration-none">
            <h1 className="h4 m-0">Logo</h1>
          </Link>
        </div>
        <nav className="d-flex align-items-center gap-4">
          <Link href="/accueil" className="text-white text-decoration-none">Accueil</Link>
          <Link href="/simulateur" className="text-white text-decoration-none">Simulateur</Link>
          <Link href="/mes-documents" className="text-white text-decoration-none">Mes documents</Link>
          <Link href="/link-three" className="text-white text-decoration-none">Link Three</Link>
          <Link href="/inscription" className="btn btn-outline-light px-4">S'inscrire</Link>
          <Link href="/connexion" className="btn btn-dark px-4">Se connecter</Link>
        </nav>
      </header>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Hero Section */}
      <div className="hero-section position-relative z-2 d-flex flex-column justify-content-center text-start ps-5" style={{ minHeight: "100vh", paddingTop: "80px" }}>
        <motion.h1 className="display-4 fw-bold mb-4 fade-in" style={{ maxWidth: "600px" }}>
          Préparez votre retraite en toute sérénité
        </motion.h1>
        <motion.p className="lead mb-4 fade-in" style={{ maxWidth: "500px" }}>
          Découvrez comment notre application peut vous aider à planifier et à optimiser votre retraite, tout en gardant vos documents importants en sécurité et facilement accessibles.
        </motion.p>
        <motion.div className="d-flex gap-3 fade-in">
          <button className="btn btn-warning btn-sm text-dark fw-semibold">Tester ma simulation</button>
          <button className="btn btn-outline-dark">Se créer un compte</button>
        </motion.div>
      </div>

      {/* Menu Sticky */}
      <motion.div className={`sticky-menu ${showMenu ? "visible" : "hidden"}`}>
        <Menu />
      </motion.div>

      {/* Section Services */}
      <div className="section text-dark bg-white">
        <motion.h2 className="display-6 fw-bold mb-5 fade-in text-center">
          Optimiser et préparer votre retraite<br />avec nos outils
        </motion.h2>
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="service-card">
                <div className="service-icon mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h3 className="h4 mb-3">Maximisez vos revenus de retraite</h3>
                <p className="mb-4">Utilisez nos outils pour optimiser vos revenus de retraite. Découvrez des stratégies pour maximiser vos pensions et autres sources de revenus.</p>
                <Link href="/simulateur" className="btn btn-warning">
                  Accéder au simulateur
                </Link>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="service-card">
                <div className="service-icon mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="h4 mb-3">Planifiez votre retraite</h3>
                <p className="mb-4">Préparez-vous pour la retraite avec nos guides et conseils. Assurez-vous d'être prêt pour cette nouvelle étape de votre vie.</p>
                <Link href="/tableau" className="btn btn-warning">
                  Accéder à mon tableau
                </Link>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="service-card">
                <div className="service-icon mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className="h4 mb-3">Stockez vos documents</h3>
                <p className="mb-4">Gardez vos documents importants en sécurité et facilement accessibles. Utilisez notre système de stockage sécurisé pour une tranquillité d'esprit.</p>
                <Link href="/documents" className="btn btn-warning">
                  Accéder à mes documents
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center">
                <AvatarSalarie />
                <h3 className="h4 mt-4 mb-3">Les salariés</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">• Anticipez votre fin de carrière avec une projection fiable</li>
                  <li>• Estimez votre âge de départ, vos trimestres validés, vos options d'optimisation</li>
                </ul>
                <button className="btn btn-primary mt-3">En savoir plus</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <AvatarFreelance/>
                <h3 className="h4 mt-4 mb-3">Les indépendants</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">• Unifiez tous vos régimes pour une vision claire</li>
                  <li>• Suivez vos cotisations URSSAF, vos points de retraite complémentaire</li>
                </ul>
                <button className="btn btn-primary mt-3">En savoir plus</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <AvatarPatron />
                <h3 className="h4 mt-4 mb-3">Les dirigeants d'entreprises</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">• Accompagnez vos collaborateurs vers une retraite maîtrisée</li>
                  <li>• Offrez un outil RH utile et un vrai service d'accompagnement</li>
                </ul>
                <button className="btn btn-primary mt-3">En savoir plus</button>
              </div>
            </div>
          </div>
        </div>

      {/* Données Sécurité */}
      <div className="section bg-light text-dark text-center">
        <motion.h2 className="display-6 fw-bold mb-5 fade-in text-primary">
          Sécurité et Stockage des Données
        </motion.h2>
        <p className="fade-in mx-auto mb-4" style={{ maxWidth: "700px" }}>
          Nous assurons un stockage sécurisé de vos données en France, aux États-Unis et en Australie.
          Chaque centre de données est relié à nos infrastructures pour garantir une <strong>disponibilité et une protection optimales</strong>.
        </p>
        <div className="fade-in container">
          <MapChart />
        </div>
      </div>

      {/* Avis Clients */}
      <div className="section bg-white text-center">
        <motion.h2 className="display-6 fw-bold mb-5 fade-in">
          Avis Clients
        </motion.h2>
        <Testimonials />
      </div>

      {/* Formulaire de contact */}
      <div className="section bg-light text-center">
        <motion.h2 className="display-6 fw-bold mb-5 fade-in text-primary">
          Nous Contacter
        </motion.h2>
        <ContactForm />
      </div>
    </div>
  );
}