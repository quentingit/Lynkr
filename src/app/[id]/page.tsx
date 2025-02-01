"use client";

type PageProps = {
  params: { id: string };
};

export default function LinktreePage({ params }: PageProps) {
  const { id } = params;

  if (!id) {
    //return notFound();
  }

  // Pour l'instant, on affiche des données statiques d'exemple
  const fakeData = {
    title: "Mon Linktree",
    links: [
      { name: "Instagram", url: "https://instagram.com" },
      { name: "Portfolio", url: "https://monportfolio.com" },
      { name: "Contact", url: "mailto:contact@monemail.com" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 to-orange-500 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">{fakeData.title}</h1>
        <ul className="space-y-3">
          {fakeData.links.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
