"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiLock, FiTarget, FiTrendingUp, FiCheckSquare,FiCheck } from "react-icons/fi";
import Menu from "@/components/Menu";
import { useAuth } from "@/context/AuthContext";
import "@/styles/home.css";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  // Si connecté, on remplace l'accueil par le dashboard
  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user]);

  return (
    <div className="home-root">
      {/* Navigation globale */}
      <Menu />

      {/* HERO */}
      <section className="hero-ely full-bleed">
          <h1 className="hero-title">
            Planifiez votre retraite en <span>toute confiance</span>
          </h1>
          <p className="hero-sub">
            Avec notre simulateur intelligent, obtenez des estimations fiables et des conseils
            personnalisés selon votre statut et vos objectifs.
          </p>
          <div className="hero-cta">
            <Link href="/simulation" className="btn-amber">
              Faire une simulation gratuite
            </Link>
          </div>
      </section>

      {/* BANDEAU PROCESS – pleine largeur */}
<section className="process-band full-height full-bleed">
  <div className="process-inner">
    <div className="process-grid">
      <div className="process-step">
        <div className="process-icon"><FiLock /></div>
        <span className="process-dot" />
        <h3 className="process-title">Connexion</h3>
        <p className="process-text">
          Vos infos sont récupérées automatiquement depuis votre compte.
        </p>
      </div>

      <div className="process-step">
        <div className="process-icon"><FiTarget /></div>
        <span className="process-dot" />
        <h3 className="process-title">Vos objectifs</h3>
        <p className="process-text">
          Choisissez l’âge de départ et le revenu souhaité.
        </p>
      </div>

      <div className="process-step">
        <div className="process-icon"><FiTrendingUp /></div>
        <span className="process-dot" />
        <h3 className="process-title">Simulation</h3>
        <p className="process-text">
          Découvrez votre âge de départ estimé et votre pension future.
        </p>
      </div>

      <div className="process-step">
        <div className="process-icon"><FiCheckSquare /></div>
        <span className="process-dot" />
        <h3 className="process-title">Conseils personnalisés</h3>
        <p className="process-text">
          Suivez nos recommandations pour optimiser votre retraite.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* GAGNEZ DU TEMPS… */}
      <section className="benefits-section full-height full-bleed">
        <div className="container grid-2">
          <div className="benefit-image">
            <Image
              src="/illustrations/dashboard-docs.jpg"
              alt="Organisation de documents"
              width={720}
              height={480}
              className="img"
            />
          </div>

          <div className="benefit-copy">
            <h2 className="benefit-title">
              Gagnez du temps et restez organisé, tout au long de votre carrière.
            </h2>
            <p className="benefit-sub">
              Vos documents ne sont pas seulement stockés&nbsp;: ils sont automatiquement triés,
              associés à vos droits, et exploitables à chaque étape de votre parcours.
            </p>

            <ul className="bullets">
              <li>
                <FiCheck /> <strong>Classement automatique</strong>
                <span> Vos documents sont classés par type et statut. Fini les dossiers sans nom.</span>
              </li>
              <li>
                <FiCheck /> <strong>Génération de dossiers prêts à l’emploi</strong>
                <span> Générez un dossier complet à envoyer à votre caisse de retraite ou au conseiller.</span>
              </li>
              <li>
                <FiCheck /> <strong>Rappels et alertes intelligentes</strong>
                <span> Recevez des notifications pour déposer les bons justificatifs au bon moment.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-strip full-height full-bleed">
        <div className="cta-inner">
          <h2 className="cta-title">
            Reprenez le contrôle sur vos<br />documents retraite
          </h2>

          <p className="cta-sub">
            Créez dès maintenant votre espace personnel sécurisé et commencez à uploader vos
            documents clés.
          </p>

          <ul className="cta-points">
            <li><FiCheck /> 14 jours gratuits</li>
            <li><FiCheck /> Stockage chiffré</li>
            <li><FiCheck /> Accessible 24/7</li>
            <li><FiCheck /> Aide à la simulation</li>
          </ul>

          <div className="center-cta">
            <Link href="/register" className="btn-amber dark cta-btn">
              Créer mon espace sécurisé
            </Link>
          </div>

          <a href="/register" className="cta-note-link">
            Sans engagement. Sans carte bancaire
          </a>
        </div>
      </section>

    </div>
  );
}
