"use client";
import { use } from "react";
import { useEffect, useState } from "react";
import TemplatePreview from "@/components/TemplatePreview/TemplatePreview";
import templateData from "@/data/defaultData.json";
type PageProps = {
  params: Promise<{ id: string }>;
};

export default function LinktreePage({ params }: PageProps) {
  const { id } = use(params);

  const [data] = useState(templateData);

  useEffect(() => {
    console.log("Chargement du Linktree ID:", id);
  }, [id]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: data.color }}
    >
      <div className="w-full max-w-md text-center">
        <TemplatePreview data={data} />
      </div>
    </div>
  );
}
