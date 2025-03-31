"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Menu from "../components/Menu";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";

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
      {/* Vidéo de fond */}
      <video autoPlay loop muted className="video-background">
        <source src="/fond.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Menu Sticky */}
      <motion.div className={`sticky-menu ${showMenu ? "visible" : "hidden"}`}>
        <Menu />
      </motion.div>

      {/* Hero Section */}
      <div className="hero-section position-relative z-3 d-flex flex-column align-items-center justify-content-center text-center">
        <motion.h1 className="display-4 fw-bold mb-4 fade-in">
          Bienvenue sur Elysion
        </motion.h1>
        <motion.p className="lead mx-auto mb-4 fade-in" style={{ maxWidth: "700px" }}>
          Votre outil ultime pour estimer votre future retraite, gérer vos documents et optimiser vos investissements.
        </motion.p>
        <motion.div className="d-flex gap-3 fade-in">
          <Link href="/simulation" className="btn btn-light text-primary fw-semibold">
            Simulation Retraite
          </Link>
          <Link href="/bulletins" className="btn btn-light text-primary fw-semibold">
            Gérer mes Bulletins
          </Link>
        </motion.div>
      </div>

      {/* Chiffres Clés */}
      <div className="section text-dark bg-white text-center">
        <motion.h2 className="display-6 fw-bold mb-5 fade-in">
          Pourquoi choisir Elysion ?
        </motion.h2>
        <div className="row row-cols-1 row-cols-md-3 g-4 container mx-auto">
          {[
            { title: "+5000", text: "Utilisateurs satisfaits" },
            { title: "98%", text: "Taux de satisfaction" },
            { title: "10+ ans", text: "D'expertise en retraite" },
          ].map((item, index) => (
            <motion.div key={index} className="col fade-in">
              <div className="testimonial-card p-3 rounded shadow-sm bg-light">
                <h3 className="h2 fw-bold text-primary">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.div>
          ))}
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
