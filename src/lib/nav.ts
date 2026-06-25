export const siteSections = [
  { id: "home", label: "Home", index: "00" },
  { id: "projects", label: "Projects", index: "01" },
  { id: "writing", label: "Writing", index: "02" },
  { id: "library", label: "Library", index: "03" },
  { id: "about", label: "About", index: "04" },
  { id: "contact", label: "Contact", index: "05" },
] as const;

export type SiteSectionId = (typeof siteSections)[number]["id"];

export function sectionHref(id: SiteSectionId) {
  return id === "home" ? "/#home" : `/#${id}`;
}
