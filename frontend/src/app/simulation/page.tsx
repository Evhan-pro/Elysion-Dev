"use client";

import { useState } from "react";
import Menu from "../../components/Menu";
import { Bar } from "react-chartjs-2";
import "../../styles/simulation.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SimulationPage() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [careerType, setCareerType] = useState("");
  const [salary, setSalary] = useState("");
  const [yearsWorked, setYearsWorked] = useState("");
  const [children, setChildren] = useState("");
  const [earlyCareer, setEarlyCareer] = useState(false);
  const [disability, setDisability] = useState(false);
  const [desiredRetirementAge, setDesiredRetirementAge] = useState("");
  const [investmentPreference, setInvestmentPreference] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [result, setResult] = useState<{
    estimatedPension: string;
    effectiveRate: string;
    estimatedRetirementAge: number;
    investmentAdvice: string[];
  } | null>(null);

  const calculateRetirement = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAge = parseInt(age, 10);
    const parsedSalary = parseFloat(salary);
    const parsedYearsWorked = parseInt(yearsWorked, 10);
    const parsedChildren = parseInt(children, 10) || 0;
    const parsedRetirementAge = parseInt(desiredRetirementAge, 10);

    if (
      isNaN(parsedAge) ||
      isNaN(parsedSalary) ||
      isNaN(parsedYearsWorked) ||
      isNaN(parsedRetirementAge)
    ) {
      setResult(null);
      return;
    }

    const legalRetirementAge = 62;
    const fullRetirementAge = 67;
    let requiredYearsForFullPension = 42;

    if (earlyCareer) requiredYearsForFullPension -= 2;
    if (disability) requiredYearsForFullPension -= 4;
    if (parsedChildren > 3) requiredYearsForFullPension -= 1;

    let effectiveRate = 0.5 + parsedYearsWorked * 0.02;
    if (effectiveRate > 0.75) effectiveRate = 0.75;

    let estimatedPension = parsedSalary * effectiveRate;
    let penalty = 0;

    if (parsedRetirementAge < fullRetirementAge) {
      let missingYears = fullRetirementAge - parsedRetirementAge;
      penalty = missingYears * 0.01;
      estimatedPension *= 1 - penalty;
    }

    let investmentAdvice = [];

    if (investmentPreference === "Immobilier") {
      investmentAdvice.push(
        "Investissez dans l'immobilier locatif pour générer des revenus passifs et valoriser votre patrimoine."
      );
      investmentAdvice.push(
        "Pensez aux SCPI pour investir dans l'immobilier sans gestion locative directe."
      );
    }

    if (investmentPreference === "Bourse") {
      if (riskTolerance === "Élevée") {
        investmentAdvice.push(
          "Un portefeuille d'actions diversifié sur les marchés internationaux peut générer une forte rentabilité sur le long terme."
        );
        investmentAdvice.push(
          "Regardez les ETFs et les fonds technologiques pour maximiser votre rendement."
        );
      } else {
        investmentAdvice.push(
          "Investissez dans des obligations d'État et des fonds indiciels pour limiter le risque tout en ayant un rendement stable."
        );
      }
    }

    if (investmentPreference === "Diversifié") {
      investmentAdvice.push(
        "Une approche équilibrée combinant immobilier, bourse et produits d’épargne sécurisés est idéale."
      );
      investmentAdvice.push(
        "Pensez à l'assurance vie en gestion pilotée pour bénéficier d'un accompagnement expert."
      );
    }

    setResult({
      estimatedPension: estimatedPension.toFixed(2),
      effectiveRate: (effectiveRate * 100).toFixed(2) + "%",
      estimatedRetirementAge: parsedRetirementAge,
      investmentAdvice,
    });
  };

  return (
    <div className="simulation-page">
      <Menu />
      <div className="container">
        <div className="simulation-form mt-4">
          <h2 className="text-center mb-4 text-primary fw-bold">Simulation de Retraite</h2>

          <form onSubmit={calculateRetirement}>
            <input
              type="number"
              placeholder="Votre âge actuel"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Genre</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </select>

            <input
              type="number"
              placeholder="Salaire mensuel net (€)"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Nombre d'années travaillées"
              value={yearsWorked}
              onChange={(e) => setYearsWorked(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Nombre d'enfants"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
            />

            <input
              type="number"
              placeholder="Âge de départ souhaité"
              value={desiredRetirementAge}
              onChange={(e) => setDesiredRetirementAge(e.target.value)}
              required
            />

            <select
              value={investmentPreference}
              onChange={(e) => setInvestmentPreference(e.target.value)}
              required
            >
              <option value="">Préférence d'investissement</option>
              <option value="Immobilier">Immobilier</option>
              <option value="Bourse">Bourse</option>
              <option value="Diversifié">Diversifié</option>
            </select>

            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              required
            >
              <option value="">Tolérance au risque</option>
              <option value="Faible">Faible</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Élevée">Élevée</option>
            </select>

            <button type="submit">Calculer ma retraite</button>
          </form>
        </div>

        {result && (
          <div className="simulation-result">
            <h3>Résultat de la simulation</h3>
            <p><strong>Âge de départ choisi :</strong> {result.estimatedRetirementAge} ans</p>
            <p><strong>Pension estimée :</strong> {result.estimatedPension} € / mois</p>
            <p><strong>Taux de remplacement :</strong> {result.effectiveRate}</p>
            <hr className="my-3" />
            <h5 className="mb-3">Conseils personnalisés :</h5>
            <ul className="text-start">
              {result.investmentAdvice.map((advice, index) => (
                <li key={index}>👉 {advice}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
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