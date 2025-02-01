"use client";
import TemplatePreview from "@/components/TemplatePreview/TemplatePreview";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import defaultData from "@/data/defaultData.json"; // 🔥 Import du JSON

// Définition du type des données
type Link = {
  id: string;
  name: string; // Assurez-vous que ce n'est pas optionnel
  title?: string;
  url: string;
  defaultUrl?: string;
};

type EditorData = {
  title: string;
  template: string;
  color: string;
  font: string;
  socialLinks: Link[]; // Assurez-vous que cela correspond bien
  customLinks: { title: string; url: string }[];
};

export default function Editeur() {
  // Données initiales de l'éditeur

  const initialData: EditorData = defaultData;

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    template: false,
    color: false,
    font: false,
    socialLinks: false,
    customLinks: false,
  });

  const [data, setData] = useState<EditorData>(initialData);
  const [newCustomLinkTitle, setNewCustomLinkTitle] = useState("");
  const [newCustomLinkUrl, setNewCustomLinkUrl] = useState("");
  const [newSocialLink, setNewSocialLink] = useState<{
    id: string;
    url: string;
  }>({
    id: "",
    url: "",
  });
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">(
    "desktop"
  );

  // Liste des réseaux sociaux disponibles pour un ajout rapide
  const availableSocials = [
    {
      id: "facebook",
      name: "Facebook",
      icon: <FaFacebook className="text-blue-600" />,
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <FaInstagram className="text-pink-500" />,
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: <FaTwitter className="text-blue-400" />,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <FaLinkedin className="text-blue-700" />,
    },
  ];

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Gestion des changements de template, couleur, police et titre
  const updateData = (field: keyof EditorData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // Gestion de l'ajout d'un réseau social avec URL personnalisée
  const addSocialLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSocialLink.id && newSocialLink.url) {
      const social = availableSocials.find((s) => s.id === newSocialLink.id);
      if (social) {
        setData((prev) => ({
          ...prev,
          socialLinks: [
            ...prev.socialLinks,
            {
              id: social.id,
              name: social.name,
              url: newSocialLink.url,
              icon: social.icon,
            },
          ],
        }));
      }
      setNewSocialLink({ id: "", url: "" });
    }
  };

  const deleteSocialLink = (id: string) => {
    setData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((link) => link.id !== id),
    }));
  };

  // Ajout et suppression des liens personnalisés
  const addCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCustomLinkTitle && newCustomLinkUrl) {
      setData((prev) => ({
        ...prev,
        customLinks: [
          ...prev.customLinks,
          { title: newCustomLinkTitle, url: newCustomLinkUrl },
        ],
      }));
      setNewCustomLinkTitle("");
      setNewCustomLinkUrl("");
    }
  };

  const deleteCustomLink = (index: number) => {
    setData((prev) => ({
      ...prev,
      customLinks: prev.customLinks.filter((_, i) => i !== index),
    }));
  };

  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{
        backgroundColor: data.color, // Utilise la couleur sélectionnée
        backgroundImage: `url('/background.jpg')`, // Met une image de fond (remplace par ton URL)
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Colonne de gauche fixe */}
      <div className="fixed top-0 left-0 bottom-0 w-80 bg-white p-6 overflow-y-auto shadow-lg">
        {/* Modification du titre */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Titre du Linktree</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => updateData("title", e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Sélection du template */}
        <div className="mb-6">
          <h3
            className="font-medium mb-2 cursor-pointer flex justify-between items-center bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => toggleSection("template")}
          >
            Choix du Template
            <span>{openSections.template ? "▲" : "▼"}</span>
          </h3>
          {openSections.template && (
            <div className="flex space-x-4">
              {["template1", "template2"].map((template) => (
                <button
                  key={template}
                  onClick={() => updateData("template", template)}
                  className={`px-4 py-2 rounded ${
                    data.template === template
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {template.charAt(0).toUpperCase() + template.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Choix de la couleur */}
        <div className="mb-6">
          <h3
            className="font-medium mb-2 cursor-pointer flex justify-between items-center bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => toggleSection("color")}
          >
            Choix de la couleur
            <span>{openSections.color ? "▲" : "▼"}</span>
          </h3>
          {openSections.color && (
            <div className="flex space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2 flex-nowrap">
              {[
                { name: "Indigo", color: "#4F46E5" },
                { name: "Rouge", color: "#DC2626" },
                { name: "Vert", color: "#16A34A" },
                { name: "Violet", color: "#9333EA" },
                { name: "Bleu", color: "#2563EB" },
                { name: "Jaune", color: "#EAB308" },
                { name: "Rose", color: "#EC4899" },
                { name: "Orange", color: "#F97316" },
                { name: "Gris", color: "#4B5563" },
                { name: "Cyan", color: "#06B6D4" },
                { name: "Teal", color: "#0D9488" },
              ].map(({ name, color }) => (
                <button
                  key={color}
                  onClick={() => updateData("color", color)}
                  className={`w-10 h-10 rounded-full border-2 border-transparent hover:border-gray-700 transition ${
                    data.color === color
                      ? "ring-2 ring-offset-2 ring-gray-700"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  title={name}
                />
              ))}
            </div>
          )}
        </div>

        {/* Choix de la police */}
        <div className="mb-6">
          <h3
            className="font-medium mb-2 cursor-pointer flex justify-between items-center bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => toggleSection("font")}
          >
            Choix de la police
            <span>{openSections.font ? "▲" : "▼"}</span>
          </h3>
          {openSections.font && (
            <select
              value={data.font}
              onChange={(e) => updateData("font", e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              {[
                "Inter",
                "Roboto",
                "Lato",
                "Poppins",
                "Merriweather",
                "Montserrat",
                "Playfair Display",
                "Open Sans",
                "Oswald",
                "Raleway",
              ].map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Ajout rapide des réseaux sociaux */}
        <div className="mb-6">
          <h3
            className="font-medium mb-2 cursor-pointer flex justify-between items-center bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => toggleSection("socialLinks")}
          >
            Ajouter un réseau social
            <span>{openSections.socialLinks ? "▲" : "▼"}</span>
          </h3>
          {openSections.socialLinks && (
            <div>
              <form
                onSubmit={addSocialLink}
                className="flex flex-col space-y-3"
              >
                <select
                  value={newSocialLink.id}
                  onChange={(e) =>
                    setNewSocialLink({ ...newSocialLink, id: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Sélectionner un réseau social</option>
                  {availableSocials.map((social) => (
                    <option key={social.id} value={social.id}>
                      {social.name}
                    </option>
                  ))}
                </select>
                <input
                  type="url"
                  placeholder="URL du profil"
                  value={newSocialLink.url}
                  onChange={(e) =>
                    setNewSocialLink({ ...newSocialLink, url: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Ajouter
                </button>
              </form>

              {/* Liste des réseaux sociaux ajoutés */}
              <div>
                <h3 className="font-medium mb-2">Réseaux sociaux ajoutés</h3>
                {data.socialLinks.length === 0 ? (
                  <p className="text-gray-500">Aucun réseau ajouté</p>
                ) : (
                  <ul className="space-y-2">
                    {data.socialLinks.map((link) => (
                      <li
                        key={link.id}
                        className="flex justify-between items-center border-b py-2"
                      >
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold">{link.name}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            Voir
                          </a>
                          <button
                            onClick={() => deleteSocialLink(link.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Supprimer
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Ajout d'un lien personnalisé */}
        <div className="mb-6">
          <h3
            className="font-medium mb-2 cursor-pointer flex justify-between items-center bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => toggleSection("customLinks")}
          >
            Ajouter un lien personnalisé
            <span>{openSections.customLinks ? "▲" : "▼"}</span>
          </h3>
          {openSections.customLinks && (
            <div>
              <form
                onSubmit={addCustomLink}
                className="flex flex-col space-y-3"
              >
                <input
                  type="text"
                  placeholder="Titre du lien"
                  value={newCustomLinkTitle}
                  onChange={(e) => setNewCustomLinkTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="url"
                  placeholder="URL"
                  value={newCustomLinkUrl}
                  onChange={(e) => setNewCustomLinkUrl(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Ajouter le lien
                </button>
              </form>
              {/* Liste des liens personnalisés */}
              <div>
                <h3 className="font-medium mb-2">Liens personnalisés</h3>
                {data.customLinks.length === 0 ? (
                  <p className="text-gray-500">Aucun lien ajouté</p>
                ) : (
                  <ul>
                    {data.customLinks.map((link, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center border-b py-2"
                      >
                        <div>
                          <p className="font-semibold">{link.title}</p>
                          <p className="text-sm text-gray-600">{link.url}</p>
                        </div>
                        <button
                          onClick={() => deleteCustomLink(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Supprimer
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Zone de prévisualisation */}
      <div className="ml-80 p-8 flex flex-col items-center">
        {/* Boutons pour basculer entre les modes */}
        <div className="mb-4 flex space-x-4">
          <button
            onClick={() => setPreviewMode("desktop")}
            className={`px-4 py-2 rounded ${
              previewMode === "desktop" ? "bg-black text-white" : "bg-gray-300"
            }`}
          >
            🖥️ Desktop
          </button>
          <button
            onClick={() => setPreviewMode("mobile")}
            className={`px-4 py-2 rounded ${
              previewMode === "mobile" ? "bg-black text-white" : "bg-gray-300"
            }`}
          >
            📱 Mobile
          </button>
        </div>

        {/* Cadre de prévisualisation */}
        <div
          className={`relative transition-all shadow-lg border border-gray-300 rounded-lg ${
            previewMode === "desktop"
              ? "w-full h-screen p-8 "
              : "w-[400px] h-[812px] bg-black p-2 rounded-[30px] border-[12px] border-gray-900"
          }`}
        >
          {/* Découpe pour la caméra du téléphone en mode mobile */}
          {previewMode === "mobile" && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-black rounded-full"></div>
          )}

          {/* Affichage du Template */}
          <div className={previewMode === "mobile" ? "h-full  p-2" : ""}>
            <TemplatePreview data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
