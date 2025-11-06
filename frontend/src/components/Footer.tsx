"use client";

import Link from "next/link";
import Image from "next/image";
import { FiFacebook, FiInstagram, FiLinkedin, FiYoutube } from "react-icons/fi";
import "@/styles/footer.css";

export default function Footer() {
  return (
    <footer className="ely-footer full-bleed">
      <div className="ely-footer__inner">
        {/* Col 1 : logo + newsletter */}
        <div className="ely-footer__col">
          <div className="ely-footer__brand">
            <Image src="/logo.png" alt="Elysion" width={140} height={40} />
          </div>

          <p className="ely-footer__text">
            Inscrivez-vous à notre newsletter pour rester au courant des
            fonctionnalités et des versions.
          </p>

          <form
            className="ely-footer__newsletter"
            onSubmit={(e) => {
              e.preventDefault();
              // branchement futur : API newsletter
              alert("Merci ! Vous êtes inscrit(e) à la newsletter.");
            }}
          >
            <input
              type="email"
              placeholder="Entrez votre email"
              aria-label="Email"
              required
            />
            <button type="submit">S’inscrire</button>
          </form>

          <p className="ely-footer__legal-note">
            En vous abonnant, vous acceptez notre politique de confidentialité
            et consentez à recevoir des mises à jour de notre entreprise.
          </p>
        </div>

        {/* Col 2 : navigation rapide */}
        <div className="ely-footer__col">
          <h4 className="ely-footer__title">Navigation rapide</h4>
          <ul className="ely-footer__links">
            <li><Link href="/simulation">Notre simulateur</Link></li>
            <li><Link href="/optimiser">Optimiser sa retraite</Link></li>
            <li><Link href="/bulletins">Stockage de documents</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/about">Qui sommes-nous ?</Link></li>
          </ul>
        </div>

        {/* Col 3 : réseaux sociaux */}
        <div className="ely-footer__col">
          <h4 className="ely-footer__title">Follow Us</h4>
          <ul className="ely-footer__social">
            <li><a href="#" aria-label="Facebook"><FiFacebook /> Facebook</a></li>
            <li><a href="#" aria-label="Instagram"><FiInstagram /> Instagram</a></li>
            <li><a href="#" aria-label="LinkedIn"><FiLinkedin /> LinkedIn</a></li>
            <li><a href="#" aria-label="YouTube"><FiYoutube /> Youtube</a></li>
          </ul>
        </div>
      </div>

      <div className="ely-footer__bottom">
        <p>© {new Date().getFullYear()} Elysion. All rights reserved.</p>
        <nav className="ely-footer__policies">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/cookies">Cookies Settings</Link>
        </nav>
      </div>
    </footer>
  );
}
