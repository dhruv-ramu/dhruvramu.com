export const siteNav = [
  { href: "/", label: "Home", exact: true },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/my-room", label: "My Room" },
  { href: "/slices", label: "Slices" },
  { href: "/#contact", label: "Contact", hash: true },
] as const;

export type SiteNavHref = (typeof siteNav)[number]["href"];

/** Homepage anchor sections (one-pager) */
export const homeSections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export type HomeSectionId = (typeof homeSections)[number]["id"];

export function homeSectionHref(id: HomeSectionId) {
  return id === "home" ? "/#home" : `/#${id}`;
}
