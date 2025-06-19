"use client";

import { useState } from "react";
import Image from "next/image";
import Menu from "../../components/Menu";
import { toast } from "react-toastify";
import "../../styles/simulation.css";

/**
 * Formulaire de simulation de retraite en 3 étapes.
 * Étape 1 – Informations générales
 * Étape 2 – Choix du statut (branche le scénario affiché à l'étape 3)
 * Étape 3 – Informations professionnelles (scénario Salarié ici)
 */
export default function SimulationPage() {
  /* --------- État global --------- */
  const [step, setStep] = useState<1 | 2 | 3>(1);

  /* --------- Étape 1 --------- */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  /* --------- Étape 2 --------- */
  type StatusType = "salarie" | "freelance" | "dirigeant" | "autre";
  const [status, setStatus] = useState<StatusType | "">("");

  /* --------- Étape 3 (Salarié) --------- */
  const [contractType, setContractType] = useState("CDI / CDD …");
  const [sector, setSector] = useState("santé / finance / tech");
  const [companyName, setCompanyName] = useState("");
  const [experienceRange, setExperienceRange] = useState("<3");
  const [careerFile, setCareerFile] = useState<File | null>(null);

  /* --------- Navigation helpers --------- */
  const next = () => setStep((s) => (s < 3 ? (s + 1) as 2 | 3 : s));
  const back = () => setStep((s) => (s > 1 ? (s - 1) as 1 | 2 : s));

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: appel back‑end ou calcul local.
    toast.success("Données envoyées avec succès !");
  };

  /* --------- Rendu conditionnel --------- */
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="wizard-title">Informations générales</h2>
            <p className="wizard-subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              varius enim in eros.
            </p>

            <div className="form-grid-cols-2">
              <div>
                <label>Nom</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Nom"
                  required
                />
              </div>
              <div>
                <label>Prénom</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Prénom"
                  required
                />
              </div>

              <div className="col-span-2">
                <label>Date de naissance</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="dd/mm/yyyy"
                  required
                />
              </div>

              <div>
                <label>Téléphone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+33"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  required
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="wizard-title">Votre statut</h2>
            <p className="wizard-subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              varius enim in eros.
            </p>

            <div className="status-grid">
              {([
                { key: "salarie", label: "Salarié" },
                { key: "freelance", label: "Freelance / indépendant" },
                { key: "dirigeant", label: "Dirigeant d'entreprise" },
                { key: "autre", label: "Autre" },
              ] as const).map(({ key, label }) => (
                <button
                  type="button"
                  key={key}
                  className={`status-option ${status === key ? "selected" : ""}`}
                  onClick={() => setStatus(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="wizard-title">Informations professionnelles</h2>
            <p className="wizard-subtitle">
              Nous avons besoin de mieux comprendre votre situation actuelle.
            </p>

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
              <input
                type="text"
                placeholder="Nom de la société"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <label>Nombre d'année d'activité salarié</label>
              <div className="experience-options">
                {[
                  "<3",
                  "3 - 5",
                  "5 - 10",
                  "10 - 20",
                  "20 - 30",
                  "30+",
                ].map((range) => (
                  <button
                    type="button"
                    key={range}
                    className={`exp-option ${experienceRange === range ? "selected" : ""}`}
                    onClick={() => setExperienceRange(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>

              <label>Relevé de carrière</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setCareerFile(e.target.files?.[0] || null)}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="simulation-page">
      <Menu />

      {/* Mini‑nav pour connexion */}
      <p className="login-reminder">
        Vous avez un compte ? <a href="/login">Connectez‑vous !</a>
      </p>

      {/* Ligne de progression */}
      <div className="progress-bar">
        <div className="progress-indicator" style={{ width: `${(step - 1) * 50}%` }} />
      </div>

      <form className="wizard-container" onSubmit={handleSubmit}>
        {renderStep()}

        {/* Footer (boutons) */}
        <div className="wizard-footer">
          {step > 1 && (
            <button type="button" className="secondary-btn" onClick={back}>
              Retour
            </button>
          )}
          {step < 3 ? (
            <button type="button" className="primary-btn" onClick={handleNext}>
              Suivant
            </button>
          ) : (
            <button type="submit" className="primary-btn">
              Valider
            </button>
          )}
        </div>

        <p className="step-count">Step {step}/3</p>
      </form>
    </div>
  );
}



// "use client";

// import { useState } from "react";
// import Menu from "../../components/Menu";

// export default function SimulationPage() {
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [salary, setSalary] = useState("");
//   const [yearsWorked, setYearsWorked] = useState("");
//   const [children, setChildren] = useState("");
//   const [desiredRetirementAge, setDesiredRetirementAge] = useState("");
//   const [investmentPreference, setInvestmentPreference] = useState("");

//   const calculateRetirement = (e: React.FormEvent) => {
//     e.preventDefault();
//     // TODO: implémenter la logique finale du calcul de retraite
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900">
//       <Menu />
//       <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
//         <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Simulation de Retraite</h2>
//         <form onSubmit={calculateRetirement} className="space-y-4">
//           <input type="number" placeholder="Votre âge actuel" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-3 border rounded-lg shadow-sm" required />
//           <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-3 border rounded-lg shadow-sm" required>
//             <option value="">Genre</option>
//             <option value="Homme">Homme</option>
//             <option value="Femme">Femme</option>
//           </select>
//           <input type="number" placeholder="Salaire mensuel net (€)" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full p-3 border rounded-lg shadow-sm" required />
//           <input type="number" placeholder="Nombre d&apos;années travaillées" value={yearsWorked} onChange={(e) => setYearsWorked(e.target.value)} className="w-full p-3 border rounded-lg shadow-sm" required />
//           <input type="number" placeholder="Nombre d&apos;enfants" value={children} onChange={(e) => setChildren(e.target.value)} className="w-full p-3 border rounded-lg shadow-sm" />
//           <input type="number" placeholder="Âge de départ souhaité" value={desiredRetirementAge} onChange={(e) => setDesiredRetirementAge(e.target.value)} className="w-full p-3 border rounded-lg shadow-sm" required />
//           <select value={investmentPreference} onChange={(e) => setInvestmentPreference(e.target.value)} className="w-full p-3 border rounded-lg shadow-sm" required>
//             <option value="">Préférence d&apos;investissement</option>
//             <option value="Immobilier">Immobilier</option>
//             <option value="Bourse">Bourse</option>
//             <option value="Diversifié">Diversifié</option>
//           </select>
//           <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition">Calculer ma retraite</button>
//         </form>
//       </div>
//     </div>
//   );
// }