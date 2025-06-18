"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Contact.module.css";

/* ---------- 1. Types ---------- */
type ContactFormData = {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  objet:
    | ""
    | "simulation"
    | "optimisation"
    | "documents"
    | "support"
    | "autre";
  message: string;
  terms: boolean;
};

/* ---------- 2. Valeur initiale ---------- */
const initialData: ContactFormData = {
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  objet: "",
  message: "",
  terms: false,
};

export default function ContactForm() {
  const [data, setData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  /* ---------- 3. Gestion du changement ---------- */
  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name } = e.target;

    const fieldValue: string | boolean =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;

    setData((prev) => ({ ...prev, [name]: fieldValue } as ContactFormData));
  };

  /* ---------- 4. Validation ---------- */
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.nom) newErrors.nom = "Requis";
    if (!data.prenom) newErrors.prenom = "Requis";
    if (!data.email) newErrors.email = "Requis";
    if (!data.objet) newErrors.objet = "Choisir un objet";
    if (!data.message) newErrors.message = "Message vide";
    if (!data.terms) newErrors.terms = "Veuillez accepter les termes";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- 5. Soumission ---------- */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erreur serveur");
      setSent(true);
      setData(initialData); // reset
    } catch (err) {
      alert("Une erreur est survenue, veuillez réessayer.");
    }
  };

  /* ---------- 6. Affichage ---------- */
  if (sent) {
    return (
      <section className={styles.centerbox}>
        <h2>Merci !</h2>
        <p>
          Votre message a bien été envoyé. Nous reviendrons vers vous rapidement.
        </p>
        <button onClick={() => setSent(false)}>
          Envoyer un autre message
        </button>
      </section>
    );
  }

  return (
    <main className={styles.wrapper}>

      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        {/* — Ligne 1 — */}
        <div className={styles.row}>
          <div>
            <label htmlFor="nom">Nom</label>
            <input
              id="nom"
              name="nom"
              value={data.nom}
              onChange={handleChange}
              required
              type="text"
            />
            {errors.nom && <span className={styles.error}>{errors.nom}</span>}
          </div>

          <div>
            <label htmlFor="prenom">Prénom</label>
            <input
              id="prenom"
              name="prenom"
              value={data.prenom}
              onChange={handleChange}
              required
              type="text"
            />
            {errors.prenom && (
              <span className={styles.error}>{errors.prenom}</span>
            )}
          </div>
        </div>

        {/* — Ligne 2 — */}
        <div className={styles.row}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div>
            <label htmlFor="telephone">Téléphone</label>
            <input
              id="telephone"
              name="telephone"
              type="tel"
              value={data.telephone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Objet */}
        <div>
          <label htmlFor="objet">Choisissez un objet</label>
          <select
            id="objet"
            name="objet"
            value={data.objet}
            onChange={handleChange}
            required
          >
            <option value="" disabled hidden>
              Select one…
            </option>
            <option value="simulation">Simulation retraite</option>
            <option value="optimisation">Optimisation retraite</option>
            <option value="documents">Stockage de documents</option>
            <option value="support">Support technique</option>
            <option value="autre">Autre</option>
          </select>
          {errors.objet && (
            <span className={styles.error}>{errors.objet}</span>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={data.message}
            onChange={handleChange}
            required
            placeholder="Tapez votre message…"
          />
          {errors.message && (
            <span className={styles.error}>{errors.message}</span>
          )}
        </div>

        {/* Checkbox */}
        <div className={styles.checkbox}>
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={data.terms}
            onChange={handleChange}
            required
          />
          <label htmlFor="terms">J’accepte les termes</label>
        </div>
        {errors.terms && (
          <span className={styles.error}>{errors.terms}</span>
        )}

        {/* Bouton */}
        <button type="submit" className={styles.submit}>
          Envoyer
        </button>
      </form>
    </main>
  );
}
