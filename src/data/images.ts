import type { SiteData } from "./site";

/** Rutas de imágenes derivadas del JSON del sitio activo. */
export function buildStockImages(site: SiteData) {
  return {
    hero: site.hero.image,
    about: {
      main: site.about.imageSide,
      secondary: site.about.imageSide,
    },
    vision: site.opr.image,
    servicesBg: "/images/stock/services-bg.jpg",
    contact: {
      banner: site.hero.image,
      office: site.hero.image,
    },
    clients: {
      header: site.hero.image,
      cards: site.clients.list.map((c) => c.logo),
    },
    services: Object.fromEntries(
      site.services.departments.map((d) => [d.id, d.image]),
    ) as Record<string, string>,
    links: Object.fromEntries(
      site.institutional.links.map((l) => [
        l.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        l.image,
      ]),
    ),
  } as const;
}
