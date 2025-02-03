import { Template } from "@/types/template";

export const templates: Template[] = [
  {
    id: "classic",
    name: "Classique",
    description: "Layout traditionnel avec liens empilés",
    layout: {
      spacing: "space-y-4",
      containerStyle: "max-w-md mx-auto",
      linkStyle: "p-4 text-center hover:shadow-lg bg-white/90",
    },
  },
  {
    id: "modern",
    name: "Moderne",
    description: "Design épuré avec espacement généreux",
    layout: {
      spacing: "space-y-6",
      containerStyle: "max-w-lg mx-auto",
      linkStyle: "p-6 text-center hover:shadow-xl bg-white/95 rounded-xl",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Style minimaliste avec bordures fines",
    layout: {
      spacing: "space-y-3",
      containerStyle: "max-w-sm mx-auto",
      linkStyle:
        "p-3 text-center hover:bg-white/10 border border-white/20 rounded",
    },
  },
  {
    id: "grid",
    name: "Grille",
    description: "Disposition en grille responsive",
    layout: {
      spacing: "grid grid-cols-1 md:grid-cols-2 gap-4",
      containerStyle: "max-w-2xl mx-auto",
      linkStyle:
        "p-4 text-center hover:scale-105 transition-transform bg-white/80 rounded-lg",
    },
  },
  {
    id: "masonry",
    name: "Masonry",
    description: "Style Pinterest avec hauteurs variables",
    layout: {
      spacing: "columns-1 md:columns-2 gap-4 space-y-4",
      containerStyle: "max-w-2xl mx-auto",
      linkStyle:
        "p-4 text-center hover:shadow-xl bg-white/90 rounded-lg break-inside-avoid",
    },
  },
  {
    id: "wave",
    name: "Vague",
    description: "Animation ondulante des liens",
    layout: {
      spacing: "space-y-4",
      containerStyle: "max-w-md mx-auto",
      linkStyle:
        "p-4 text-center hover:translate-y-[-5px] transition-transform bg-white/85 rounded-lg animate-[wave_3s_ease-in-out_infinite]",
    },
  },
  {
    id: "diagonal",
    name: "Diagonal",
    description: "Disposition en diagonale",
    layout: {
      spacing: "space-y-6",
      containerStyle: "max-w-xl mx-auto transform -rotate-2",
      linkStyle:
        "p-5 text-center hover:rotate-2 transition-transform bg-white/90 rounded-lg shadow-lg",
    },
  },
];
