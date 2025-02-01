"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import FloatingLinks from "./home/FloatingsLinks";

const Home: React.FC = () => {
  return (
    <div
      style={{ backgroundColor: "#1b114f" }}
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Effet de boutons animés en arrière-plan */}

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4 z-10"
      >
        {/* Image optimisée avec Next.js */}
        <Image
          src="/lynkr-home.png"
          width={500}
          height={300}
          alt="Lynkr Home"
          className="z-2"
        />

        <h1 className="text-4xl font-bold mb-4">
          Crée ton Linktree personnalisé
        </h1>
        <p className="mb-8">
          Assemble tous tes liens préférés dans une page élégante et colorée.
        </p>

        {/* Bouton avec effet de survol amélioré */}
        <Link
          href="/editeur"
          className="relative px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition transform hover:scale-105 text-xl"
        >
          Commencer
        </Link>
      </motion.div>
      <FloatingLinks />
    </div>
  );
};

export default Home;
