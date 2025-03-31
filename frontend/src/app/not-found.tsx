"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-900 to-blue-600 text-white text-center p-6">
      {/* Logo */}
      <motion.img 
        src="/logo.png" 
        alt="Logo" 
        className="w-24 mb-4" 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      <motion.h1
        className="text-7xl font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        404
      </motion.h1>
      <motion.h2
        className="text-2xl font-semibold mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Oups ! Vous êtes perdu dans la retraite anticipée...
      </motion.h2>
      <motion.p
        className="mt-2 max-w-lg text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Cette page a peut-être pris sa retraite plus tôt que prévu... Mais pas d&apos;inquiétude !
        Revenez à l&apos;accueil pour retrouver votre simulation de retraite et optimiser vos finances.
      </motion.p>
      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.7 }}
      >
        <Link href="/">
          <button className="px-6 py-3 bg-[#FCD34D] text-blue-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition">
            Retour à l&apos;accueil
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
