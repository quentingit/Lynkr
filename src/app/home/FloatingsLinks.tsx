"use client";

import { motion } from "framer-motion";

const links = [
  { name: "Mon Instagram", icon: "📸" },
  { name: "Mon Book Photo", icon: "📷" },
  { name: "Mon Facebook", icon: "📘" },
  { name: "Mon LinkedIn", icon: "💼" },
  { name: "Mon Twitter", icon: "🐦" },
  { name: "Mon TikTok", icon: "🎵" },
  { name: "Mon Site Web", icon: "🌍" },
  { name: "Ma Chaîne YouTube", icon: "📹" },
  { name: "Mon Discord", icon: "💬" },
  { name: "Mon GitHub", icon: "💻" },
  { name: "Mon Twitch", icon: "🎮" },
  { name: "Mon Pinterest", icon: "📌" },
  { name: "Mon Blog", icon: "📝" },
  { name: "Mon SnapChat", icon: "👻" },
  { name: "Mon Medium", icon: "✍️" },
];

const FloatingLinks: React.FC = () => {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden -z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 1 }}
    >
      {links.map((link, i) => {
        const startX = Math.random() * 100; // Position horizontale aléatoire
        const startY = Math.random() * 100; // Position verticale aléatoire
        const duration = 10 + Math.random() * 5; // Durée variable
        const scaleSize = Math.random() * (2 - 0.6) + 0.6; // Taille aléatoire entre 0.6x et 2x
        const fontSize = Math.random() * (1.5 - 0.8) + 0.8; // Taille de texte entre 0.8rem et 1.5rem

        return (
          <motion.div
            key={i}
            className="absolute bg-white/30 text-yellow-100 rounded-full font-semibold shadow-lg text-center"
            style={{
              top: `${startY}%`, // Position verticale aléatoire
              left: `${startX}%`, // Position horizontale aléatoire
              pointerEvents: "none", // Désactive l'interaction avec les liens
              padding: "10px 20px", // Ajoute du padding en fonction du texte
              whiteSpace: "nowrap", // Empêche les retours à la ligne
              fontSize: `${fontSize}rem`, // Taille de police aléatoire
              transformOrigin: "center", // Centre le scale correctement
            }}
            animate={{
              y: ["0%", "150%"], // Descend bien au-delà de l'écran
              opacity: [0, 1, 1, 0], // Disparaît à la fin
              scale: scaleSize, // Applique une taille aléatoire
            }}
            transition={{
              duration: duration, // Vitesse variable entre 10 et 15 secondes
              repeat: Infinity,
              ease: "linear",
              delay: i * 1, // Décalage progressif
            }}
          >
            {/* Le texte est maintenant un span non cliquable */}
            <span className="flex items-center gap-2">
              <span>{link.icon}</span> {link.name}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FloatingLinks;
