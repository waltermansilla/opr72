import type { SiteData } from "./site";

export type ServiceSection = {
  title: string;
  items: string[];
};

export type Service = {
  id: string;
  title: string;
  image: string;
  intro: string;
  items?: string[];
  listLabel?: string;
  footer?: string;
  sections?: ServiceSection[];
};

export type SiteContent = ReturnType<typeof buildSiteContent>;

export function buildSiteContent(site: SiteData) {
  const navLinks = site.menu.enlaces.map((link) => ({
    href: `#${link.id}`,
    label: link.etiqueta,
  }));

  const menuLinks = navLinks.filter((l) => l.href !== "#contacto");

  return {
    site,
    navLinks,
    menuLinks,
    navContactLabel: site.menu.botonContacto,
    aboutContent: site.quienesSomos,
    aboutText: site.quienesSomos.parrafos.join("\n\n"),
    visionContent: site.vision,
    visionText: site.vision.texto,
    clients: site.clientes.lista.map((client) => ({
      name: client.nombre,
      location: client.ubicacion,
      image: client.imagen,
    })),
    clientsContent: site.clientes,
    interestLinks: site.enlacesInteres.lista.map((link) => ({
      title: link.titulo,
      url: link.url,
      image: link.imagen,
    })),
    interestLinksContent: site.enlacesInteres,
    servicesContent: site.servicios,
    services: site.servicios.departamentos.map((dept) => ({
      id: dept.id,
      title: dept.titulo,
      image: dept.imagen,
      intro: dept.intro,
      ...(dept.etiquetaLista ? { listLabel: dept.etiquetaLista } : {}),
      ...(dept.items ? { items: dept.items } : {}),
      ...(dept.pie ? { footer: dept.pie } : {}),
      ...(dept.secciones
        ? {
            sections: dept.secciones.map((section) => ({
              title: section.titulo,
              items: section.items,
            })),
          }
        : {}),
    })) as Service[],
    contactContent: site.contacto,
    contact: {
      email: site.contacto.email,
      phone: site.contacto.telefono,
      phoneDisplay: site.contacto.telefonoMostrar,
      phoneHref: site.contacto.telefonoEnlace,
      address: site.contacto.direccion,
      city: site.contacto.ciudad,
      mapEmbed: site.contacto.mapaEmbed,
      mapsDirectionsUrl: site.contacto.mapaComoLlegar,
      whatsapp: site.contacto.whatsappEnlace,
      whatsappMessage: site.contacto.whatsappMensaje,
      mailtoSubject: site.contacto.emailAsunto,
      cards: site.contacto.tarjetas,
      mapTitle: site.contacto.mapaTitulo,
    },
    heroContent: site.hero,
    footerContent: site.pie,
    whatsappFloating: site.whatsappFlotante,
    logoContent: site.logo,
  };
}
