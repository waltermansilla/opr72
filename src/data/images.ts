/**
 * Imágenes de prueba en /public/images/stock/ (Unsplash).
 * Para producción: reemplazá cada archivo .jpg por la foto real
 * manteniendo el mismo nombre, o cambiá las rutas acá.
 */
const s = "/images/stock";

export const stockImages = {
  hero: `${s}/hero.jpg`,
  about: {
    main: `${s}/about-main.jpg`,
    secondary: `${s}/about-secondary.jpg`,
  },
  vision: `${s}/vision.jpg`,
  servicesBg: `${s}/services-bg.jpg`,
  contact: {
    banner: `${s}/contact-banner.jpg`,
    office: `${s}/contact-office.jpg`,
  },
  clients: {
    header: `${s}/clients-header.jpg`,
    cards: [
      `${s}/client-01.jpg`,
      `${s}/client-02.jpg`,
      `${s}/client-03.jpg`,
      `${s}/client-04.jpg`,
      `${s}/client-05.jpg`,
      `${s}/client-06.jpg`,
      `${s}/client-07.jpg`,
      `${s}/client-08.jpg`,
      `${s}/client-09.jpg`,
      `${s}/client-10.jpg`,
    ],
  },
  services: {
    capacitacion: `${s}/service-capacitacion.jpg`,
    proteccion: `${s}/service-proteccion.jpg`,
    salvamento: `${s}/service-salvamento.jpg`,
    legales: `${s}/service-legales.jpg`,
    oficiales: `${s}/service-oficiales.jpg`,
  },
  links: {
    uscg: `${s}/link-uscg.jpg`,
    pna: `${s}/link-pna.jpg`,
    armada: `${s}/link-armada.jpg`,
    imo: `${s}/link-imo.jpg`,
    ordenanzas: `${s}/link-ordenanzas.jpg`,
  },
} as const;
