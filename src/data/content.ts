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

/** Adaptador legacy (componentes viejos no usados en Opr72Page). */
export function buildSiteContent(site: SiteData) {
  const navLinks = site.nav.map((link) => ({
    href: `#${link.id}`,
    label: link.label,
  }));

  const menuLinks = navLinks.filter((l) => l.href !== "#contacto");

  return {
    site,
    navLinks,
    menuLinks,
    navContactLabel: "Contacto",
    aboutContent: {
      id: site.about.id,
      parrafos: site.about.paragraphs,
      encabezado: {
        etiqueta: site.about.title,
        titulo: site.about.title,
        descripcion: site.about.paragraphs[0] ?? "",
      },
      destacados: [] as { valor: string; etiqueta: string }[],
      imagenPrincipal: site.about.imageSide,
      imagenPrincipalAlt: site.about.imageSideAlt,
      imagenSecundaria: site.about.imageSide,
      imagenSecundariaAlt: site.about.imageSideAlt,
    },
    aboutText: site.about.paragraphs.join("\n\n"),
    visionContent: {
      id: "vision",
      texto: site.vision.text,
      titulo: site.vision.title,
      etiqueta: site.vision.title,
      imagen: site.opr.image,
      imagenAlt: site.opr.title,
    },
    visionText: site.vision.text,
    clients: site.clients.list.map((client) => ({
      name: client.name,
      location: client.location,
      image: client.logo,
    })),
    clientsContent: {
      id: site.clients.id,
      imagenCabecera: site.hero.image,
      imagenCabeceraAlt: site.hero.imageAlt,
      encabezado: {
        etiqueta: site.clients.label,
        titulo: site.clients.title,
        descripcion: site.gallery.subtitle,
      },
    },
    interestLinks: site.institutional.links.map((link) => ({
      title: link.title,
      url: link.url,
      image: link.image,
    })),
    interestLinksContent: {
      id: site.institutional.id,
      encabezado: {
        etiqueta: site.institutional.label,
        titulo: site.institutional.title,
        descripcion: site.institutional.intro,
      },
    },
    servicesContent: {
      id: site.services.id,
      encabezado: {
        etiqueta: site.services.label,
        titulo: site.services.title,
        descripcion: site.services.intro,
      },
    },
    services: site.services.departments.map((dept) => ({
      id: dept.id,
      title: dept.title,
      image: dept.image,
      intro: dept.intro,
      ...(dept.listLabel ? { listLabel: dept.listLabel } : {}),
      ...(dept.items ? { items: dept.items } : {}),
      ...(dept.footnote ? { footer: dept.footnote } : {}),
      ...(dept.sections
        ? {
            sections: dept.sections.map((section) => ({
              title: section.title,
              items: section.items,
            })),
          }
        : {}),
    })) as Service[],
    contactContent: {
      id: site.contact.id,
      encabezado: {
        etiqueta: site.contact.label,
        titulo: site.contact.title,
        descripcion: site.contact.description,
      },
      mapaTitulo: "Ubicación de OPR72 en Google Maps",
      tarjetas: {
        direccion: "Dirección",
        telefono: "Teléfono",
        email: "Email",
        botonComoLlegar: "Cómo llegar",
        botonLlamar: "Llamar",
        botonWhatsapp: "WhatsApp",
        botonEmail: "Escribir email",
      },
    },
    contact: {
      email: site.contact.email,
      phone: site.contact.phoneDisplay,
      phoneDisplay: site.contact.phoneDisplay,
      phoneHref: site.contact.phoneHref,
      address: site.contact.address,
      city: site.contact.city,
      mapEmbed: site.contact.mapEmbed,
      mapsDirectionsUrl: site.contact.mapsDirectionsUrl,
      whatsapp: site.contact.whatsapp,
      whatsappMessage: site.contact.whatsappMessage,
      mailtoSubject: site.contact.mailtoSubject,
      mapTitle: "Ubicación de OPR72 en Google Maps",
    },
    heroContent: {
      imagen: site.hero.image,
      imagenAlt: site.hero.imageAlt,
      etiqueta: site.hero.eyebrow,
      titulo: site.hero.title,
      subtitulo: site.hero.subtitle,
      descripcion: site.hero.subtitle,
      botones: {
        contacto: site.hero.ctaPrimary,
        servicios: site.hero.ctaSecondary,
      },
    },
    footerContent: {
      descripcion: site.brand.tagline,
      copyright: `${site.brand.name}. Todos los derechos reservados.`,
    },
    whatsappFloating: {
      tooltip: "¡Hola! ¿En qué te puedo ayudar?",
      mensaje: site.contact.whatsappMessage,
      etiquetaAccesibilidad: "Contactar por WhatsApp",
    },
    logoContent: site.logo,
  };
}
