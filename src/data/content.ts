import { stockImages } from "./images";

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

export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#quienes-somos", label: "Quiénes Somos" },
  { href: "#vision", label: "Visión" },
  { href: "#servicios", label: "Servicios" },
  { href: "#clientes", label: "Clientes" },
  { href: "#enlaces", label: "Enlaces" },
  { href: "#contacto", label: "Contacto" },
];

export const aboutText = `Somos un grupo de profesionales del ámbito marítimo y portuario con diferentes formaciones, ellas comprenden formación dentro de la Autoridad Marítima Argentina y de la Marina Mercante, siendo nuestra visión muy amplia y siendo su aliado más eficaz y ayudando a las organizaciones y el personal de dirección en el mejoramiento de la gestión y las prácticas empresariales, como así también en el desempeño individual y colectivo.

Teniendo la satisfacción de presentarle una amplia y diversa gama de servicios, que estamos en condiciones de brindarles a través de los distintos departamentos que integran la estructura de nuestra organización.`;

export const visionText =
  "Aspiramos a ser la organización de servicios más competitiva y productiva de Argentina y Sudamérica y nuestra competencia y procesos de mejora continua son las herramientas que nos permiten estar a la vanguardia del sector.";

export const clients = [
  {
    name: "Terminales Río de la Plata",
    location: "Puerto Buenos Aires",
    image: stockImages.clients.cards[0],
  },
  {
    name: "Terminal 4 – APM Terminals",
    location: "Puerto Buenos Aires",
    image: stockImages.clients.cards[1],
  },
  {
    name: "Raizen Argentina S.A.U",
    location: "Puerto Dock Sud",
    image: stockImages.clients.cards[2],
  },
  {
    name: "Compañía General de Combustibles",
    location: "Puerto Río Gallegos",
    image: stockImages.clients.cards[3],
  },
  {
    name: "Yacimientos Carboníferos Río Turbio",
    location: "Puerto Río Gallegos",
    image: stockImages.clients.cards[4],
  },
  {
    name: "Consorcio de Gestión del Puerto de San Nicolás",
    location: "Puerto San Nicolás",
    image: stockImages.clients.cards[5],
  },
  {
    name: "Consorcio Regional Puerto Mar del Plata",
    location: "Puerto Mar del Plata",
    image: stockImages.clients.cards[6],
  },
  {
    name: 'Terminal de Pasajeros "Benito Quinquela Martín"',
    location: "Puerto Buenos Aires",
    image: stockImages.clients.cards[7],
  },
  {
    name: 'Terminal de Pasajeros "Colonia Express"',
    location: "Puerto Buenos Aires",
    image: stockImages.clients.cards[8],
  },
  {
    name: "Atalaya Servicios Fluviales",
    location: "Puerto Corrientes",
    image: stockImages.clients.cards[9],
  },
];

export const interestLinks = [
  {
    title: "United States Coast Guard",
    url: "https://www.uscg.mil/",
    image: stockImages.links.uscg,
  },
  {
    title: "Prefectura Naval Argentina",
    url: "https://www.argentina.gob.ar/prefecturanaval",
    image: stockImages.links.pna,
  },
  {
    title: "Armada Argentina",
    url: "https://www.argentina.gob.ar/defensa/armada",
    image: stockImages.links.armada,
  },
  {
    title: "IMO",
    url: "https://www.imo.org/",
    image: stockImages.links.imo,
  },
  {
    title: "Ordenanzas",
    url: "https://www.argentina.gob.ar/prefecturanaval/reglamentacion/ordenanzas",
    image: stockImages.links.ordenanzas,
  },
];

export const services: Service[] = [
  {
    id: "capacitacion",
    title: "Departamento Capacitación",
    image: stockImages.services.capacitacion,
    intro:
      "Cursos obligatorios acorde al Código Internacional para la Protección de los Buques y de las Instalaciones Portuarias (Código P.B.I.P), destinado a personas que ejerzan actividad, oficio o profesión dentro del ámbito portuario y marítimo, los que son dictados por esta Organización de Protección Reconocida y habilitada por Disposición del Registro de la Prefectura Naval Argentina, acorde los lineamientos establecidos en la Ordenanza Nº 09/03 (DPSJ).",
    items: [
      "Oficiales de Protección de las Instalaciones Portuarias (O.P.I.P)",
      "Oficiales de Protección del Buque (O.P.B)",
      "Oficiales de la Compañía para la Protección Marítima (O.C.P.M)",
      "Directores Técnicos (D.T)",
      "Personal de Vigilancia (V.G)",
      "Personal de Gremios Portuarios (G.P)",
    ],
    listLabel: "Nuestra actividad docente capacita profesionalmente a:",
  },
  {
    id: "proteccion",
    title: "Departamento Protección",
    image: stockImages.services.proteccion,
    intro:
      "Seguimiento en la implementación del sistema de protección acorde a los lineamientos establecidos en la Ordenanza Nº 06/03 (DPSJ).",
    items: [
      "Instalaciones Portuarias",
      "Buques",
      "Amarraderos",
      "Empresas Privadas de Seguridad y Vigilancia",
      "Empresas de Trabajos Portuarios",
      "Sistemas de Gestión de Seguridad",
      "Manuales de Gestión de Seguridad: Asesoramiento y desarrollo",
      "Cursos de Formación de Auditores Internos, Persona Designada (MSC-MEPC.7/Circ.6)",
      "Capacitación integral de las tripulaciones y personal terrestre de las Compañías mediante Cursos de inducción. Cursos específicos de tripulaciones de buques pesqueros bajo los lineamientos de la Guía Orientativa para la Implementación de Sistemas de Gestión de la Seguridad en Buques Pesqueros – Versión 1 – y normativa específica.",
      "Seguimiento de la implementación, auditorías en Compañía y Buques (Código ISM – Normativas Nacionales e Internacionales)",
    ],
    listLabel: "Encargado de efectuar:",
  },
  {
    id: "salvamento",
    title: "Departamento Salvamento y Buceo",
    image: stockImages.services.salvamento,
    intro:
      "Asesoramiento para operaciones de buceo profesional en estructuras sumergidas en puertos, diques, plantas de agua, centrales eléctricas y nucleares, refinerías, tomas de agua.",
    items: [
      "Informes técnicos",
      "Inspecciones subacuáticas",
      "Ingeniería y proyectos de obra en agua y bajo agua",
      "Cortes bajo agua con soplete",
      "Colocación de anclajes",
      "Rotura de hormigón bajo agua con martillos hidráulicos",
      "Reflotamientos",
      "Búsqueda y recuperación bajo agua",
      "Batimetrías",
      "Colocación de protecciones costeras (mantas-geo celdas)",
      "Remoción y extracción de sedimentos, barros y arenas",
      "Reparación y mantenimiento de sistemas mecánicos sumergidos",
    ],
    footer:
      "Todo el personal del Departamento cumple con lo especificado en la Ordenanza Nº 04/08 (DPSN) de la Prefectura Naval Argentina.",
  },
  {
    id: "legales",
    title: "Departamento Legales",
    image: stockImages.services.legales,
    intro:
      "Tienen a cargo la representación legal de la empresa ante los juzgados y tribunales de todo el país. Asimismo, tienen los controles de normativas nacionales e internacionales para el buen funcionamiento de la empresa, y debiendo planificar las acciones legales a adoptar y los recursos a dedicar a cada área legal para evitar contingencias en primer lugar, y en segundo lugar para ofrecer las alternativas legales más plausibles o afines con la política de la empresa y más económicas desde el punto de vista de coste financiero-fiscal.",
    sections: [
      {
        title: "Funciones",
        items: [
          "Producir la normatividad interna de la empresa.",
          "Representar legalmente a la empresa en juzgados y tribunales.",
          "Controlar las normativas generales, junto con la dirección administrativa, para el buen funcionamiento de la empresa.",
        ],
      },
      {
        title: "Derecho Marítimo",
        items: ["Asesoramiento Normativo Nacional e Internacional."],
      },
      {
        title: "Derecho Portuario",
        items: [
          "Asesoramiento por daños por contaminación.",
          "Redacción de cláusulas generales de contratación.",
          "Asistencia normativa sobre habilitación y constitución de puertos (Incluye asesoramiento sobre cumplimiento normativa de la Autoridad Marítima Argentina).",
        ],
      },
    ],
  },
  {
    id: "oficiales",
    title: "Departamento Oficiales de Protección",
    image: stockImages.services.oficiales,
    intro:
      "Nuestros O.P.I.P's están altamente capacitados en la actividad y operatoria portuaria, como asimismo en la reglamentación, procedimientos y legislación aplicables.",
    items: [
      "Acompañar y gestionar las actividades que debe desarrollar la Terminal para superar las Inspecciones Anuales de Recertificación del Plan de Protección de la Instalación Portuaria.",
      "Coordinar la implementación del PPIP con los OPB y los OCPM.",
      "Efectuar las Declaraciones de Protección con los buques que arriben a la zona portuaria.",
      "Recomendar e incluir, según proceda, modificaciones al PPIP en caso de deficiencias o cambios en la IP para su actualización.",
      "Establecer los mecanismos de coordinación con la Dependencia Jurisdiccional de P.N.A.",
      "Ayudar a los OPB a confirmar la identidad de las personas que tratan de subir a bordo, cuando así se requiera.",
      "Efectuar enlace con las Agencias Marítimas, Proveedores, etc. que deseen ingresar a zona portuaria.",
      "Todas estas actividades están previstas y contempladas en la Ordenanza Nº 01/04 –DPSJ concordantes con el Código de Protección de Buques e Instalaciones Portuarias (P.B.I.P).",
    ],
    listLabel: "Principales funciones:",
  },
];

/** Datos de contacto según pie de página de QUIÉNES SOMOS.docx (actualizado). No usar contacto.html. */
export const contact = {
  email: "hectorburges@yahoo.com.ar",
  phone: "011-1564585350",
  phoneDisplay: "+54 9 11 6458-5350",
  phoneHref: "tel:+5491164585350",
  address: 'Av. Córdoba 391 12º "A"',
  city: "Ciudad Autónoma de Buenos Aires",
  website: "https://www.opr72.com",
  websiteLabel: "www.opr72.com",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.2287681416233!2d-58.375225924524926!3d-34.59837625721571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacb396bfaad%3A0xc29d175562c1ec09!2sAv.%20C%C3%B3rdoba%20391%2C%20C1054%20AAC%2C%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1725551399974!5m2!1ses!2sar",
  whatsapp: "https://wa.me/5491164585350",
};
