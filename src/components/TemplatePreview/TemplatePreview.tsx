import React, { JSX } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

interface TemplatePreviewProps {
  data: {
    title: string;
    template: string;
    color: string;
    font: string;
    socialLinks: { name: string; url: string; id: string }[];
    customLinks: { title: string; url: string }[];
  };
}

const socialIcons: { [key: string]: JSX.Element } = {
  facebook: (
    <FaFacebook
      className="text-blue-600 hover:text-blue-800 transition"
      size={28}
    />
  ),
  instagram: (
    <FaInstagram
      className="text-pink-500 hover:text-pink-700 transition"
      size={28}
    />
  ),
  twitter: (
    <FaTwitter
      className="text-blue-400 hover:text-blue-600 transition"
      size={28}
    />
  ),
  linkedin: (
    <FaLinkedin
      className="text-blue-700 hover:text-blue-900 transition"
      size={28}
    />
  ),
};

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ data }) => {
  const previewStyle = {
    fontFamily: `var(--font-${data.font.toLowerCase()})`,
    backgroundColor: data.color, // Appliquer la couleur de fond
    backgroundImage: `url('/background.jpg')`, // Appliquer une image si nécessaire
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  // Gestion des classes Tailwind pour la couleur de fond des boutons
  // const buttonStyle = {
  //   backgroundColor: data.color,
  // };

  return (
    <div
      className="p-6 rounded-lg shadow-md w-full h-full max-w-md mx-auto"
      style={previewStyle}
    >
      {/* Appliquer un template différent selon data.template */}
      {data.template === "template1" ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
          {/* Icônes des réseaux sociaux au-dessus */}
          <div className="flex justify-center space-x-4 mb-4">
            {data.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {socialIcons[link.id] || null}
              </a>
            ))}
          </div>
          {/* Liens en colonne */}
          <div className="space-y-3">
            {data.customLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 rounded bg-white text-black hover:opacity-90 transition"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      ) : (
        // Template 2 : Disposition en mode carte avec ombres
        <div className="text-left p-4 bg-white rounded-lg shadow-xl">
          <h1 className="text-2xl font-semibold mb-2">{data.title}</h1>
          {/* Icônes en mode liste alignée à gauche */}
          <div className="flex flex-wrap gap-4 mb-4">
            {data.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {socialIcons[link.id] || null}
              </a>
            ))}
          </div>
          {/* Liens affichés sous forme de boutons carrés */}
          <div className="grid grid-cols-2 gap-4">
            {data.customLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition text-center"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatePreview;
