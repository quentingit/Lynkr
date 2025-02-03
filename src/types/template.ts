export type TemplateType =
  | "classic"
  | "modern"
  | "minimal"
  | "cards"
  | "grid"
  | "masonry"
  | "wave"
  | "diagonal";

export type Template = {
  id: TemplateType;
  name: string;
  description: string;
  layout: {
    spacing: string;
    containerStyle: string;
    linkStyle: string;
  };
};
