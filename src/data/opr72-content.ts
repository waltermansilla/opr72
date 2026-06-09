/**
 * Contenido oficial OPR72 — prioridad info-opr72.docx,
 * complementos desde info-proseport.docx donde aplica.
 */
const IMG = "/images-oficial";
const DEPT = "/images/departamentos";
const VID = "/videos-oficial";

export const opr72Content = {
  brand: {
    name: "OPR72",
    tagline: "Organización de Protección Reconocida Nº 72",
    logo: "/logo-opr72.png",
    logoStacked: "/logo-opr72-stacked.png",
  },
  nav: [
    { id: "inicio", label: "Inicio" },
    { id: "quienes-somos", label: "Quiénes Somos" },
    { id: "servicios", label: "Servicios" },
    { id: "opr", label: "Nuestra OPR" },
    { id: "clientes", label: "Clientes" },
    { id: "institucional", label: "Institucional" },
    { id: "contacto", label: "Contacto" },
  ],
  hero: {
    eyebrow: "Prefectura Naval Argentina · Habilitación oficial",
    title: "Protección portuaria con respaldo institucional",
    subtitle:
      "Consultora especializada en protección, seguridad, capacitación y servicios marítimos para puertos, buques y quienes operan en ellos.",
    ctaPrimary: "Solicitar asesoramiento",
    ctaSecondary: "Conocer servicios",
    image: `${IMG}/hero.jpeg`,
    imageAlt: "Buque atracado en terminal portuaria — OPR72",
  },
  presentation: {
    title: "Conocé nuestros sectores",
    subtitle:
      "Video de presentación con operaciones reales en puertos, protección y servicios marítimos.",
    video: `${VID}/presentacion.mp4`,
    poster: `${IMG}/hero.jpeg`,
    cta: "Ver presentación",
  },
  mobileGalleries: {
    afterAbout: {
      images: [
        {
          src: `${IMG}/galeria-7.jpeg`,
          alt: "Cumplimiento normativo en sistemas de carga",
        },
        {
          src: `${IMG}/contacto.jpeg`,
          alt: "Seguridad en mantenimiento de instalaciones",
        },
        {
          src: `${IMG}/hero.jpeg`,
          alt: "Protección portuaria en operaciones de gran volumen",
        },
        {
          src: `${IMG}/galeria-8.jpeg`,
          alt: "Alcance operativo en muelles argentinos",
        },
        {
          src: `${IMG}/servicio-salvamento.jpeg`,
          alt: "Salvamento y soporte en el muelle",
        },
      ],
    },
    closing: {
      image: {
        src: `${IMG}/galeria-3.jpeg`,
        alt: "Protección de buques durante la carga",
      },
    },
  },
  gallery: {
    id: "galeria",
    label: "En el campo",
    title: "Operaciones portuarias",
    images: [
      {
        src: `${IMG}/opr.jpeg`,
        alt: "OPR72 al servicio de puertos y buques",
      },
      {
        src: `${IMG}/galeria-1.jpeg`,
        alt: "Seguridad en acopios y turnos nocturnos",
      },
      {
        src: `${IMG}/galeria-2.jpeg`,
        alt: "Acompañamiento en operaciones críticas a bordo",
      },
      {
        src: `${IMG}/galeria-3.jpeg`,
        alt: "Protección de buques durante la carga",
      },
      {
        src: `${IMG}/galeria-4.jpeg`,
        alt: "Coordinación con equipos en zona portuaria",
      },
      {
        src: `${IMG}/galeria-5.jpeg`,
        alt: "Supervisión en instalaciones de carga masiva",
      },
      {
        src: `${IMG}/galeria-6.jpeg`,
        alt: "Presencia en operaciones nocturnas de terminal",
      },
      {
        src: `${IMG}/about-1.jpeg`,
        alt: "Respaldo institucional en cada atraque",
      },
      {
        src: `${IMG}/about-2.jpeg`,
        alt: "Trabajo junto a quienes operan el puerto",
      },
      {
        src: `${IMG}/servicio-proteccion.jpeg`,
        alt: "Departamento Protección en terminal activa",
      },
      {
        src: `${IMG}/servicio-capacitacion.jpeg`,
        alt: "Capacitación aplicada al trabajo real",
      },
      {
        src: `${IMG}/servicio-asesoria.jpeg`,
        alt: "Asesoría técnica en operaciones portuarias",
      },
      {
        src: `${IMG}/servicio-comercial.jpeg`,
        alt: "Soluciones integrales para la terminal",
      },
      {
        src: `${IMG}/servicio-medio-ambiente.jpeg`,
        alt: "Prevención ambiental en carga a granel",
      },
    ],
  },
  developer: {
    label: "Sitio desarrollado por",
    name: "Walter Mansilla",
    instagram: "https://www.instagram.com/waltermansilla.web/",
  },
  marquee: [
    "O.P.R. Nº 72",
    "Prefectura Naval Argentina",
    "Código P.B.I.P.",
    "Puertos argentinos",
    "Seguridad marítima",
    "Capacitación habilitada",
  ],
  stats: [
    { value: "72", label: "Organización de Protección Reconocida" },
    { value: "6", label: "Departamentos especializados" },
    { value: "10+", label: "Clientes de referencia en Argentina" },
    { value: "PNA", label: "Habilitación y registro oficial" },
  ],
  about: {
    id: "quienes-somos",
    label: "Quiénes somos",
    title: "Profesionales al servicio de la protección portuaria",
    paragraphs: [
      "Somos una Consultora que brinda un servicio profesional en materia de protección, seguridad, capacitación y servicios marítimos, enfocados a los puertos, buques y a las personas que en ella prestan servicios y ayudando a las organizaciones y el personal de dirección en el mejoramiento de la gestión y las prácticas empresariales, como así también en el desempeño individual y colectivo.",
      "Asimismo como Organización de Protección Reconocida (O.P.R) Nº 72 habilitada por Disposición PMAP, PJ.8 Nº 174/2016 del registro de la Prefectura Naval Argentina, acorde los lineamientos establecidos en la Ordenanza Nº 09/03 (DPSJ) nos encargamos de la capacitación establecida en el Código de Protección de Buques e Instalaciones Portuarias (P.B.I.P).",
      "Cumpliendo también con las exigencias para el dictado de los cursos establecidos por la Prefectura Naval Argentina al personal de tierra vinculado al transporte marítimo, fluvial y lacustre de mercancías peligrosas acorde los lineamientos establecidos en la Ordenanza Nº 05/11 (DPAM).",
    ],
    imageMain: `${IMG}/about-1.jpeg`,
    imageSecondary: `${IMG}/about-2.jpeg`,
  },
  opr: {
    id: "opr",
    label: "Respaldo oficial",
    title: "Organización de Protección Reconocida",
    lead: "La confianza de operar con una OPR habilitada por la Autoridad Marítima Argentina es la base de cada servicio que brindamos.",
    blocks: [
      {
        title: "Habilitación PNA",
        text: "O.P.R. Nº 72 registrada ante la Prefectura Naval Argentina — Disposición PMAP, PJ.8 Nº 174/2016, en línea con la Ordenanza Nº 09/03 (DPSJ).",
      },
      {
        title: "Código P.B.I.P.",
        text: "Capacitación y acompañamiento conforme al Código de Protección de Buques e Instalaciones Portuarias, norma internacional adoptada por la República Argentina.",
      },
      {
        title: "Compromiso nacional",
        text: "Trabajamos alineados con la Autoridad Marítima, las Fuerzas Armadas y la legislación vigente, honrando el rol estratégico de los puertos para el desarrollo del país.",
      },
    ],
    image: `${IMG}/opr.jpeg`,
  },
  representative: {
    label: "Nuestro representante",
    name: "Hector Burges",
    role: "Representante · OPR72",
    image: "/hector.jpg",
    imageAlt:
      "Hector Burges en presentación institucional sobre protección portuaria",
    text: "Trayectoria consolidada en protección portuaria, seguridad marítima y asesoramiento ante la Autoridad Marítima Argentina.",
  },
  audience: {
    id: "alcance",
    label: "Alcance",
    title: "Destinado para",
    intro:
      "Teniendo la satisfacción de presentarle una amplia y diversa gama de servicios, que estamos en condiciones de brindarles a través de los distintos departamentos que integran la estructura de nuestra organización.",
    image: `${IMG}/galeria-4.jpeg`,
    imageAlt:
      "Vista aérea de operación portuaria con buque en carga y personal en el muelle",
    items: [
      "Instalaciones Portuarias",
      "Empresas Privadas de Vigilancia",
      "Empresas de Transporte",
      "Empresas de Trabajos Portuarios",
      "Armadores",
      "Organismos Oficiales",
      "Empresas que documentan y/o manipulan M.M.PP.",
    ],
  },
  vision: {
    id: "vision",
    title: "Nuestra visión",
    text: "Aspiramos a ser la organización de servicios más competitiva y productiva de Argentina y Sudamérica y nuestra competencia y procesos de mejora continua son las herramientas que nos permiten estar a la vanguardia del sector.",
    image: `${IMG}/opr.jpeg`,
    imageAlt:
      "Granelero en operación de carga con grúas de cubierta en terminal portuaria",
  },
  services: {
    id: "servicios",
    label: "Departamentos",
    title: "Nuestros servicios",
    intro:
      "Seis áreas especializadas para acompañar cada etapa de la protección, la capacitación y la operación portuaria.",
    departments: [
      {
        id: "capacitacion",
        number: "01",
        title: "Departamento Capacitación",
        image: `${DEPT}/capacitacion.jpg`,
        description:
          "Capacitación oficial bajo el Código P.B.I.P. para quienes ejercen oficio o profesión en el ámbito portuario.",
        intro:
          "Cursos obligatorios acorde el Código de Protección de Buques e Instalaciones Portuarias (P.B.I.P), destinado a personas que ejerzan oficio o profesión dentro del ámbito portuario.",
        listLabel: "Nuestra actividad docente capacita profesionalmente a:",
        items: [
          "Oficial de Protección de las Instalaciones Portuarias (O.P.I.P)",
          "Oficiales de Protección del Buque (O.P.B)",
          "Oficiales de la Compañía para la Protección Marítima (O.C.P.M)",
          "Directores Técnicos (D.T)",
          "Personal de Vigilancia y/o Custodia (V.G)",
          "Personal de Gremios Portuarios (G.P)",
          "Personal que ejerza actividad, oficio o profesión en zona portuaria",
        ],
        footnote:
          "Cursos dictados por esta Organización de Protección Reconocida y habilitada por Disposición del Registro de la Prefectura Naval Argentina, Ordenanza Nº 09/03 (DPSJ).",
      },
      {
        id: "proteccion",
        number: "02",
        title: "Departamento Protección",
        image: `${DEPT}/proteccion.jpg`,
        description:
          "Diagnóstico, evaluación y acompañamiento en la implementación de sistemas de protección para puertos y buques.",
        intro:
          "Diagnóstico, evaluación y acompañamiento integral en la implementación de sistemas de protección para instalaciones portuarias y buques.",
        listLabel: "Servicios principales:",
        items: [
          "Diagnóstico preliminares",
          "Evaluación de Protección de Instalaciones Portuarias",
          "Plan de Protección de Instalaciones Portuarias",
          "Evaluación de Protección de Buques",
          "Plan de Protección de Buques",
          "Acompañamiento y guía en la implementación de los sistemas de protección de la Instalación Portuaria y/o buques",
          "Manuales de Protección para facilidades portuarias",
          "Acompañamiento para la obtención del Documento Nacional de Protección para las facilidades portuarias",
          "Gestión ante la Prefectura Naval Argentina para la obtención de la certificación",
          "Seguimiento en la implementación del sistema de protección — Ordenanza Nº 06/03 (DPSJ)",
          "Sistemas de Gestión de Seguridad y auditorías (Código ISM — normativas nacionales e internacionales)",
        ],
      },
      {
        id: "medio-ambiente",
        number: "03",
        title: "Departamento Medio Ambiente",
        image: `${DEPT}/medio-ambiente.jpg`,
        description:
          "Cursos y asesoramiento ambiental vinculados al transporte de mercancías peligrosas y la prevención de la contaminación.",
        intro:
          "Capacitación y asesoramiento ambiental vinculado al transporte marítimo, fluvial y lacustre de mercancías peligrosas.",
        listLabel: "Incluye:",
        items: [
          "Dictado de cursos para el personal de tierra vinculado al transporte marítimo, fluvial y lacustre de mercancías peligrosas — Ordenanza Nº 05/11 (DPAM)",
          "Diagnósticos preliminares",
          "Planes de contingencia",
          "Planes de Emergencia para derrames de sustancias nocivas, potencialmente peligrosas y perjudiciales",
          "Normas para prevenir la contaminación atmosférica proveniente de los buques",
          "Acompañamiento para la obtención del Certificado de Prevención de la Contaminación Atmosférica (Ordenanza Nº 02/12 – DPAM)",
        ],
      },
      {
        id: "asesoria",
        number: "04",
        title: "Departamento Asesoría",
        image: `${DEPT}/asesoria.jpg`,
        description:
          "Consultoría en protección portuaria para instalaciones, navieras, empresas de vigilancia y organismos oficiales.",
        intro:
          "Asesoramiento en materia de protección para instalaciones portuarias, navieras, vigilancia, transporte y organismos oficiales.",
        listLabel: "Destinatarios del asesoramiento:",
        items: [
          "Instalaciones Portuarias",
          "Empresas Navieras",
          "Empresas Privadas de Vigilancia",
          "Empresas de Transporte",
          "Empresas de Trabajos Portuarios",
          "Armadores",
          "Organismos Oficiales",
        ],
        sections: [
          {
            title: "Oficiales de Protección (O.P.I.P)",
            items: [
              "Acompañar y gestionar las actividades para superar las Inspecciones Anuales de Recertificación del PPIP",
              "Coordinar la implementación del PPIP con los OPB y los OCPM",
              "Efectuar las Declaraciones de Protección con los buques que arriben a la zona portuaria",
              "Establecer mecanismos de coordinación con la Dependencia Jurisdiccional de P.N.A.",
              "Enlace con Agencias Marítimas, Proveedores, etc. — Ordenanza Nº 01/04 – DPSJ y Código P.B.I.P.",
            ],
          },
          {
            title: "Asesoramiento jurídico y normativo (complemento)",
            items: [
              "Asesoramiento normativo nacional e internacional en Derecho Marítimo",
              "Asesoramiento por daños por contaminación y derecho portuario",
              "Asistencia normativa sobre habilitación y constitución de puertos ante la Autoridad Marítima Argentina",
            ],
          },
        ],
      },
      {
        id: "salvamento",
        number: "05",
        title: "Departamento Salvamento y Buceo",
        image: `${DEPT}/salvamento.jpg`,
        description:
          "Buceo profesional, inspecciones subacuáticas y obras especializadas en puertos, diques e instalaciones industriales.",
        intro:
          "Asesoramiento para operaciones de buceo profesional en estructuras sumergidas en puertos, diques, plantas de agua, centrales eléctricas y nucleares, refinerías, tomas de agua, etc.",
        items: [
          "Inspecciones subacuáticas",
          "Ingeniería y proyectos de obra en agua y bajo agua",
          "Cortes bajo agua con soplete / Colocación de anclajes",
          "Rotura de hormigón bajo agua con martillos hidráulicos",
          "Búsqueda y recuperación bajo agua",
          "Reflotamientos",
          "Batimetrías",
          "Colocación de protecciones costeras (mantas geo-celdas)",
          "Remoción y extracción de sedimentos, barros y arena",
          "Reparación y mantenimiento de sistemas mecánicos sumergidos",
          "Inspección final de fondo limpio",
        ],
        footnote:
          "Todo el personal del Departamento cumple con lo especificado en la Ordenanza Nº 04/08 (DPSN) de la Prefectura Naval Argentina.",
      },
      {
        id: "comercial",
        number: "06",
        title: "Departamento Comercial",
        image: `${DEPT}/comercial.jpg`,
        description:
          "Convenios en vigilancia, seguridad informática y electrónica con la mejor relación precio–beneficio de plaza.",
        intro: "Poseemos convenios con:",
        items: [
          "Agencias Privadas de Vigilancia",
          "Seguridad Informática",
          "Seguridad electrónica",
        ],
        highlight:
          "Ofrecemos la relación precio – beneficio más baja de plaza: un cuidadoso conocimiento y seguimiento de los costos nos permite trasladar al cliente en todos los casos los beneficios de una mayor productividad y una mayor administración.",
      },
    ],
  },
  clients: {
    id: "clientes",
    label: "Trayectoria",
    title: "Nuestros principales clientes",
    list: [
      {
        name: "Terminales Río de la Plata",
        location: "Puerto Buenos Aires",
        logo: "/images/clientes/client-01.png",
        url: "https://www.trp.com.ar/",
      },
      {
        name: "Terminal 4 – APM Terminals",
        location: "Puerto Buenos Aires",
        logo: "/images/clientes/client-02.png",
        url: "https://www.apmterminals.com",
      },
      {
        name: "Raizen Argentina S.A.U",
        location: "Puerto Dock Sud",
        logo: "/images/clientes/client-03.png",
        url: "https://www.raizen.com.ar/",
      },
      {
        name: "Compañía General de Combustibles",
        location: "Puerto Río Gallegos",
        logo: "/images/clientes/client-04.png",
        url: "https://cgc.energy/spanish/",
      },
      {
        name: "Yacimientos Carboníferos Río Turbio",
        location: "Puerto Río Gallegos",
        logo: "/images/clientes/client-05.png",
        url: "https://www.ycrt.gob.ar/",
      },
      {
        name: "Consorcio de Gestión del Puerto de San Nicolás",
        location: "Puerto San Nicolás",
        logo: "/images/clientes/client-06.png",
        url: "https://www.puertosannicolas.com/",
        logoMarqueeClass: "brightness-0 invert",
      },
      {
        name: "Consorcio Regional Puerto Mar del Plata",
        location: "Puerto Mar del Plata",
        logo: "/images/clientes/client-07.png",
        url: "https://puertomardelplata.net/",
        logoMarqueeClass: "brightness-0 invert",
      },
      {
        name: 'Terminal de Pasajeros "Benito Quinquela Martín"',
        location: "Puerto Buenos Aires",
        logo: "/images/clientes/client-08.png",
        url: "https://www.argentina.gob.ar/administracion-general-de-puertos",
        logoMarqueeClass: "brightness-0 invert",
      },
      {
        name: 'Terminal de Pasajeros "Colonia Express"',
        location: "Puerto Buenos Aires",
        logo: "/images/clientes/client-09.png",
        url: "https://www.coloniaexpress.com/ar?utm_term=colonia%20express&utm_campaign=%5BARG%5D%5BMB-00%5D+Google+Search+BRAND&utm_source=adwords&utm_medium=ppc&hsa_acc=4254375779&hsa_cam=62977716&hsa_grp=2345228676&hsa_ad=678465986117&hsa_src=g&hsa_tgt=aud-521140519589:kwd-4287247012&hsa_kw=colonia%20express&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=62977716&gbraid=0AAAAADymMwzNyVGiwNgnQ1DJi9M_s3mbl&gclid=CjwKCAjw857RBhAgEiwAI-1yKHJcGdd65KfeAb_42oHif1IWNgYrXP5imUYaOg9c1T0UhXLX4bwEGRoCtFgQAvD_BwE",
      },
      {
        name: "Atalaya Servicios Fluviales",
        location: "Puerto Corrientes",
        logo: "/images/clientes/client-10.gif",
        url: "https://agenciaatalaya.com/",
      },
    ],
  },
  institutional: {
    id: "institucional",
    label: "Vínculos institucionales",
    title: "Marco normativo y organismos de referencia",
    intro:
      "Nuestra labor se desarrolla en el marco de la Autoridad Marítima Argentina, las normas internacionales del sector y el compromiso con la seguridad de los puertos nacionales.",
    visitLabel: "Visitar sitio",
    // Imágenes en public/images/institucional/ — reemplazar archivos (16:10 recomendado)
    links: [
      {
        title: "Prefectura Naval Argentina",
        url: "https://www.argentina.gob.ar/prefecturanaval",
        image: "/images/institucional/pna.jpg",
      },
      {
        title: "Armada Argentina",
        url: "https://www.argentina.gob.ar/defensa/armada",
        image: "/images/institucional/armada.jpg",
      },
      {
        title: "Ordenanzas PNA",
        url: "https://www.argentina.gob.ar/prefecturanaval/reglamentacion/ordenanzas",
        image: "/images/institucional/ordenanzas.png",
      },
      {
        title: "IMO",
        url: "https://www.imo.org/",
        image: "/images/institucional/imo.png",
      },
      {
        title: "United States Coast Guard",
        url: "https://www.uscg.mil/",
        image: "/images/institucional/uscg.jpg",
        imageClass: "object-[center_72%]",
      },
    ],
  },
  contact: {
    id: "contacto",
    label: "Contacto",
    title: "Hablemos de su operación portuaria",
    description: "Escribinos, llamanos o visitanos en nuestra oficina en CABA.",
    image: `${IMG}/contacto.jpeg`,
    email: "hectorburges@yahoo.com.ar",
    phone: "011-1564585350",
    phoneDisplay: "+54 9 11 6458-5350",
    phoneHref: "tel:+5491164585350",
    address: 'Av. Córdoba 391 12º "A"',
    city: "Ciudad Autónoma de Buenos Aires",
    mapEmbed:
      "https://www.google.com/maps?q=-34.5983897,-58.3726244&hl=es&z=17&output=embed",
    mapsDirectionsUrl:
      "https://maps.app.goo.gl/WTTizdSPnUqi7VNZ6?g_st=iw",
    whatsapp: "https://wa.me/5491164585350",
    whatsappMessage:
      "Hola, estaba viendo la web de OPR72 y quería hacer una consulta.",
    mailtoSubject: "Consulta OPR72",
  },
} as const;

export type Opr72Content = typeof opr72Content;
