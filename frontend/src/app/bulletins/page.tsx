"use client";

import { useState } from "react";
import Menu from "../../components/Menu";
import { useDropzone } from "react-dropzone";
import "../../styles/bulletins.css";

export default function BulletinsPage() {
  const allBulletins = [
    { id: 1, date: "2024-02", status: "Validé" },
    { id: 2, date: "2024-01", status: "Validé" },
    { id: 3, date: "2023-12", status: "Validé" },
    { id: 4, date: "2023-11", status: "En attente" },
    { id: 5, date: "2023-10", status: "En attente" },
    { id: 6, date: "2023-09", status: "Validé" },
  ];

  const [displayedCount, setDisplayedCount] = useState(6);
  const lastSixMonthsBulletins = allBulletins.slice(0, 6);
  const [filter, setFilter] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [uploadDate, setUploadDate] = useState("");
  const [message, setMessage] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setFileUploaded(true);
    setShowPopup(true);
  };

  const handleConfirmUpload = () => {
    const existingBulletins = allBulletins.filter(b => b.date === uploadDate);
    if (existingBulletins.length > 0) {
      setMessage(`Il y a déjà ${existingBulletins.length} bulletin(s) pour cette période.`);
    } else {
      setMessage("Bulletin ajouté avec succès !");
    }
    setTimeout(() => {
      setShowPopup(false);
      setMessage("");
      setFileUploaded(false);
    }, 2000);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="bulletin-page">
      <Menu />

      <div className="container py-5">
        <div className="row g-4">
          {/* Zone de drag & drop */}
          <div className="col-md-6">
            <h2 className="mb-3 fw-bold text-primary">Déposer un bulletin</h2>
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p className="text-primary">Déposez vos bulletins ici ou cliquez pour sélectionner un fichier</p>
            </div>
          </div>

          {/* Liste des bulletins récents */}
          <div className="col-md-6">
            <h2 className="mb-3 fw-bold text-primary">6 derniers bulletins</h2>
            <div className="bulletin-list">
              {lastSixMonthsBulletins.map((bulletin) => (
                <div key={bulletin.id} className="bulletin-item">
                  <span>{bulletin.date}</span>
                  <span className={`bulletin-status ${bulletin.status === "Validé" ? "validé" : "attente"}`}>
                    {bulletin.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pop-up de sélection de période */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              {!message ? (
                <>
                  <h3 className="mb-3 text-primary">Sélectionnez la période</h3>
                  <input
                    type="month"
                    value={uploadDate}
                    onChange={(e) => setUploadDate(e.target.value)}
                  />
                  <button onClick={handleConfirmUpload}>Confirmer</button>
                </>
              ) : (
                <p className="text-success">{message}</p>
              )}
            </div>
          </div>
        )}

<div className="filter-section container mt-5">
  <h2 className="mb-3 fw-bold text-primary">Tous les bulletins</h2>

  <input
    type="month"
    className="form-control mb-4"
    placeholder="Filtrer par période (YYYY-MM)"
    value={filter}
    onChange={(e) => {
      setFilter(e.target.value);
      setDisplayedCount(6); // Réinitialise l'affichage lors du filtre
    }}
  />

  <div className="bulletin-list">
    {(filter
      ? allBulletins.filter((b) => b.date.includes(filter))
      : allBulletins
    )
      .slice(0, displayedCount)
      .map((bulletin) => (
        <div key={bulletin.id} className="bulletin-item">
          <span>{bulletin.date}</span>
          <span
            className={`bulletin-status ${
              bulletin.status === "Validé" ? "validé" : "attente"
            }`}
          >
            {bulletin.status}
          </span>
        </div>
      ))}

    {/* Bouton voir plus */}
    {(filter
      ? allBulletins.filter((b) => b.date.includes(filter)).length > displayedCount
      : allBulletins.length > displayedCount) && (
      <button
        className="btn btn-primary mt-3"
        onClick={() => setDisplayedCount((prev) => prev + 6)}
      >
        Voir plus
      </button>
    )}
  </div>
</div>

      </div>
    </div>
  );
}



// fichier: ./src/app/bulletins/page.tsx
// "use client";

// import Menu from "../../components/Menu";

// export default function BulletinsPage() {
//   const allBulletins = [
//     { id: 1, date: "2024-02", status: "Validé" },
//     { id: 2, date: "2024-01", status: "Validé" },
//     { id: 3, date: "2023-12", status: "Validé" },
//     { id: 4, date: "2023-11", status: "En attente" },
//     { id: 5, date: "2023-10", status: "En attente" },
//     { id: 6, date: "2023-09", status: "Validé" },
//   ];

//   const lastSixMonthsBulletins = allBulletins.slice(0, 6);

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900">
//       <Menu />
//       <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
//         {/* Zone de dépôt des fichiers actuellement désactivée */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-blue-900 mb-4">Déposer un bulletin</h2>
//           <div className="border-2 border-dashed border-blue-600 bg-white p-10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition">
//             <p className="text-lg text-blue-600">Déposez vos bulletins ici ou cliquez pour sélectionner un fichier</p>
//           </div>
//         </div>

//         {/* Affichage des bulletins des 6 derniers mois */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-blue-900 mb-4">Bulletins des 6 derniers mois</h2>
//           <ul className="space-y-4">
//             {lastSixMonthsBulletins.map((bulletin) => (
//               <li key={bulletin.id} className="flex justify-between p-3 border rounded-lg shadow-sm">
//                 <span>{bulletin.date}</span>
//                 <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${bulletin.status === "Validé" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
//                   {bulletin.status}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
