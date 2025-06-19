"use client";

import { useState } from "react";
import Image from "next/image";
import Menu from "../../components/Menu";
import { toast } from "react-toastify";
import "../../styles/simulation.css";

/**
 * Wizard multi‑étapes – parcours Salarié ou Freelance.
 * - Étape 1 : Informations générales
 * - Étape 2 : Choix du statut
 * - Étape 3 : Formulaire professionnel adapté au statut
 *   · Salarié → infos CDI/CDD …
 *   · Freelance → infos statut juridique, CA, …
 * - (Optionnel) Étape 4 : résultat / résumé (non encore implémentée)
 */
export default function SimulationPage() {
  /* ---------- état global & progression ---------- */
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  type StatusType = "salarie" | "freelance" | "dirigeant" | "autre";
  const [status, setStatus] = useState<StatusType | "">("");
  const maxSteps = status === "freelance" ? 4 : 3;
  const progress = ((step - 1) / (maxSteps - 1)) * 100; /* 0‑100 % */

  /* ---------- Étape 1 ---------- */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  /* ---------- Étape 3 Salarié ---------- */
  const [contractType, setContractType] = useState("CDI / CDD …");
  const [sector, setSector] = useState("santé / finance / tech");
  const [companyName, setCompanyName] = useState("");
  const [experienceRange, setExperienceRange] = useState("<3");
  const [careerFile, setCareerFile] = useState<File | null>(null);

  /* ---------- Étape 3 Freelance ---------- */
  const [legalStatus, setLegalStatus] = useState("Micro‑entreprise / EI / EURL / SASU / Autre");
  const [mainActivity, setMainActivity] = useState("Libre");
  const [activityStart, setActivityStart] = useState("");
  const [averageTurnover, setAverageTurnover] = useState("");
  const [retirementAffiliations, setRetirementAffiliations] = useState<string[]>([]);
  const [attestationFile, setAttestationFile] = useState<File | null>(null);

  /* ---------- navigation helpers ---------- */
  const next = () => setStep((s) => (s < maxSteps ? ((s + 1) as typeof s) : s));
  const back = () => setStep((s) => (s > 1 ? ((s - 1) as typeof s) : s));

  /* ---------- validations ---------- */
  const validateStep1 = () => {
    if (!firstName || !lastName || !birthDate || !email) {
      toast.error("Merci de remplir tous les champs obligatoires");
      return false;
    }
    return true;
  };
  const validateStep2 = () => {
    if (!status) {
      toast.error("Merci de sélectionner votre statut");
      return false;
    }
    return true;
  };
  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    next();
  };

  /* ---------- submit ---------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Données envoyées avec succès !");
  };

  /* ---------- rendu conditionnel ---------- */
  const renderStep = () => {
    /* ====== ÉTAPE 1 ====== */
    if (step === 1) {
      return (
        <>
          <h2 className="wizard-title">Informations générales</h2>
          <p className="wizard-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
          <div className="form-grid-cols-2">
            <div>
              <label>Nom</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" required />
            </div>
            <div>
              <label>Prénom</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" required />
            </div>
            <div className="col-span-2">
              <label>Date de naissance</label>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
            </div>
            <div>
              <label>Téléphone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+33" />
            </div>
            <div>
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.com" required />
            </div>
          </div>
        </>
      );
    }

    /* ====== ÉTAPE 2 ====== */
    if (step === 2) {
      return (
        <>
          <h2 className="wizard-title">Votre statut</h2>
          <p className="wizard-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
          <div className="status-grid">
            {[
              { key: "salarie", label: "Salarié" },
              { key: "freelance", label: "Freelance / indépendant" },
              { key: "dirigeant", label: "Dirigeant d'entreprise" },
              { key: "autre", label: "Autre" },
            ].map(({ key, label }) => (
              <button key={key} type="button" className={`status-option ${status === key ? "selected" : ""}`} onClick={() => setStatus(key as StatusType)}>
                {label}
              </button>
            ))}
          </div>
        </>
      );
    }

    /* ====== ÉTAPE 3 ====== */
    if (step === 3 && status === "salarie") {
      /* -------- scenario salarié -------- */
      return (
        <>
          <h2 className="wizard-title">Informations professionnelles</h2>
          <p className="wizard-subtitle">Nous avons besoin de mieux comprendre votre situation actuelle.</p>
          <div className="form-vertical">
            <label>Type de contrat</label>
            <select value={contractType} onChange={(e) => setContractType(e.target.value)}>
              <option value="CDI / CDD …">CDI / CDD …</option>
              <option value="CDD">CDD</option>
              <option value="CDI">CDI</option>
              <option value="Intérim">Intérim</option>
            </select>
            <label>Secteur d'activité</label>
            <select value={sector} onChange={(e) => setSector(e.target.value)}>
              <option value="santé / finance / tech">santé / finance / tech</option>
              <option value="santé">Santé</option>
              <option value="finance">Finance</option>
              <option value="tech">Tech</option>
              <option value="industrie">Industrie</option>
            </select>
            <label>Nom de la société</label>
            <input type="text" placeholder="Nom de la société" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            <label>Nombre d'année d'activité salarié</label>
            <div className="experience-options">
              {["<3", "3 - 5", "5 - 10", "10 - 20", "20 - 30", "30+"].map((range) => (
                <button key={range} type="button" className={`exp-option ${experienceRange === range ? "selected" : ""}`} onClick={() => setExperienceRange(range)}>
                  {range}
                </button>
              ))}
            </div>
            <label>Relevé de carrière</label>
            <input type="file" accept="application/pdf" onChange={(e) => setCareerFile(e.target.files?.[0] || null)} />
          </div>
        </>
      );
    }

    if (step === 3 && status === "freelance") {
      /* -------- scenario freelance -------- */
      const toggleAffiliation = (label: string) => {
        setRetirementAffiliations((prev) => (prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]));
      };
      return (
        <>
          <h2 className="wizard-title">Informations professionnelles</h2>
          <p className="wizard-subtitle">Nous avons besoin de mieux comprendre votre situation actuelle.</p>
          <div className="form-vertical">
            <label>Statut juridique</label>
            <select value={legalStatus} onChange={(e) => setLegalStatus(e.target.value)}>
              <option>Micro‑entreprise / EI / EURL / SASU / Autre</option>
              <option value="Micro‑entreprise">Micro‑entreprise</option>
              <option value="EI">Entreprise individuelle</option>
              <option value="EURL">EURL</option>
              <option value="SASU">SASU</option>
              <option value="Autre">Autre</option>
            </select>
            <label>Activité principale</label>
            <select value={mainActivity} onChange={(e) => setMainActivity(e.target.value)}>
              <option>Libre</option>
              <option value="Libérale">Libérale</option>
              <option value="Commerce">Commerce</option>
              <option value="Artisanat">Artisanat</option>
            </select>
            <label>Date de début d'activité</label>
            <input type="date" value={activityStart} onChange={(e) => setActivityStart(e.target.value)} />
            <label>Chiffre d'affaire annuel moyen</label>
            <input type="number" placeholder="€" value={averageTurnover} onChange={(e) => setAverageTurnover(e.target.value)} />
            <label>Affiliation retraite</label>
            <div className="checkbox-grid">
              {[
                "First choice",
                "Second choice",
                "Third choice",
                "Fourth choice",
                "Other",
              ].map((opt) => (
                <label key={opt} className="checkbox-item">
                  <input type="checkbox" checked={retirementAffiliations.includes(opt)} onChange={() => toggleAffiliation(opt)} /> {opt}
                </label>
              ))}
            </div>
            <label>Attestation</label>
            <input type="file" accept="application/pdf" onChange={(e) => setAttestationFile(e.target.files?.[0] || null)} />
          </div>
        </>
      );
    }

    /* ====== ÉTAPE 4 (placeholder) ====== */
    if (step === 4) {
      return (
        <>
          <h2 className="wizard-title">Récapitulatif</h2>
          <p className="wizard-subtitle">Cette étape sera prochainement détaillée.</p>
        </>
      );
    }
  };

  
  