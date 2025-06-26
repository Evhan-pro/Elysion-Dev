/* FRONTEND ─────────────── app/layout.tsx */
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { AuthProvider } from "@/context/AuthContext";
import Menu from "@/components/Menu";
import ChatBot from "@/components/ChatBot";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-100 text-gray-900">

        <AuthProvider>

          <Menu />

          <main className="container mx-auto p-6">
            {children}
            <ChatBot />
          </main>

        </AuthProvider>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
        />

        <footer className="bg-blue-600 text-white text-center p-4">
          © {new Date().getFullYear()} Simulateur de Retraite. Tous droits réservés.
        </footer>

        <SpeedInsights />
      </body>
    </html>
  );
}
