"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { name: "Mon Instagram", url: "https://instagram.com", icon: "📸" },
  { name: "Mon Book Photo", url: "https://myportfolio.com", icon: "📷" },
  { name: "Mon Facebook", url: "https://facebook.com", icon: "📘" },
  { name: "Mon LinkedIn", url: "https://linkedin.com", icon: "💼" },
  { name: "Mon Twitter", url: "https://twitter.com", icon: "🐦" },
  { name: "Mon TikTok", url: "https://tiktok.com", icon: "🎵" },
  { name: "Mon Site Web", url: "https://monsite.com", icon: "🌍" },
  { name: "Ma Chaîne YouTube", url: "https://youtube.com", icon: "📹" },
  { name: "Mon Discord", url: "https://discord.com", icon: "💬" },
  { name: "Mon GitHub", url: "https://github.com", icon: "💻" },
  { name: "Mon Twitch", url: "https://twitch.tv", icon: "🎮" },
  { name: "Mon Pinterest", url: "https://pinterest.com", icon: "📌" },
  { name: "Mon Blog", url: "https://monblog.com", icon: "📝" },
  { name: "Mon SnapChat", url: "https://snapchat.com", icon: "👻" },
  { name: "Mon Medium", url: "https://medium.com", icon: "✍️" },
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
        const buttonSize = Math.random() * (1.5 - 0.8) + 0.8; // Taille aléatoire entre 0.8x et 1.5x

        return (
          <motion.div
            key={i}
            className="absolute bg-white/30 text-yellow-100 rounded-full font-semibold shadow-lg text-center"
            style={{
              top: `${startY}%`, // Départ sur toute la hauteur
              left: `${startX}%`, // Position aléatoire
              transform: `scale(${buttonSize})`, // Applique une taille aléatoire
              padding: "10px 20px", // Ajoute du padding en fonction du texte
              whiteSpace: "nowrap", // Empêche les retours à la ligne
            }}
            animate={{
              y: ["0%", "150%"], // Descend bien au-delà de l'écran
              opacity: [1, 1, 0], // Disparaît à la fin
            }}
            transition={{
              duration: duration, // Vitesse variable entre 10 et 15 secondes
              repeat: Infinity,
              ease: "linear",
              delay: i * 1, // Décalage progressif
            }}
          >
            <Link
              href={link.url}
              target="_blank"
              className="hover:underline flex items-center gap-2"
            >
              <span>{link.icon}</span> {link.name}
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FloatingLinks;
