import type { SiteData } from "./site";

/** Rutas de imágenes derivadas del JSON del sitio activo. */
export function buildStockImages(site: SiteData) {
  return {
    hero: site.hero.imagen,
    about: {
      main: site.quienesSomos.imagenPrincipal,
      secondary: site.quienesSomos.imagenSecundaria,
    },
    vision: site.vision.imagen,
    servicesBg: "/images/stock/services-bg.jpg",
    contact: {
      banner: "/images/stock/contact-banner.jpg",
      office: "/images/stock/contact-office.jpg",
    },
    clients: {
      header: site.clientes.imagenCabecera,
      cards: site.clientes.lista.map((c) => c.imagen),
    },
    services: Object.fromEntries(
      site.servicios.departamentos.map((d) => [d.id, d.imagen]),
    ) as Record<string, string>,
    links: Object.fromEntries(
      site.enlacesInteres.lista.map((l) => [
        l.titulo
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        l.imagen,
      ]),
    ),
  } as const;
}
