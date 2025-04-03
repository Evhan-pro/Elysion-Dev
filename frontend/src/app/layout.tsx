import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import ChatBot from "../components/ChatBot";
import { ToastContainer } from "react-toastify";

console.log("globals.css chargé !");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto text-xl font-semibold">
            Simulateur de Retraite
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto p-6">
          {children}
          <ChatBot />
        </main>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
        />

        {/* Footer */}
        <footer className="bg-blue-600 text-white text-center p-4 mt-6">
          © {new Date().getFullYear()} Simulateur de Retraite. Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}
