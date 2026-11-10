// Todo el texto de la web, por idioma. Los componentes no escriben texto propio.
import type { DocId, Lang, PageId, SubwebId } from '../../shared/site';

interface Copy {
  /** Nombre del idioma en ese idioma, para el selector. */
  name: string;
  ogLocale: string;
  title: Record<PageId, string>;
  description: Record<PageId, string>;
  /** La línea de entrada de cada subweb; el vestíbulo no lleva frase. */
  line: Record<SubwebId, string>;
  /** Las dos puertas del vestíbulo, que llevan a cada subweb. */
  door: Record<SubwebId, { label: string; meta: string }>;
  /** Botón del PDF dentro de cada subweb. */
  doc: Record<DocId, { label: string; meta: (pages: number, size: string) => string }>;
  home: string;
  /** Nombre accesible de la marca de la cabecera, que vuelve al vestíbulo. */
  backHome: string;
  /** Nombre accesible del conmutador entre las dos subwebs. */
  channels: string;
  prev: string;
  next: string;
  rowLabel: string;
  alco: {
    /** El titular, en dos líneas. */
    headline: [string, string];
    lede: string;
    book: string;
    nav: { events: string; photos: string };
    folders: string;
    moments: string;
    sample: string;
    real: string;
    count: (n: number) => string;
    seeAll: string;
    howTitle: string;
    howBody: string;
    facts: { big: string; small: string }[];
    where: string;
    photo: string;
    prepTitle: string;
    card: {
      /** La pregunta grande sobre la foto, en dos líneas. */
      line: [string, string];
      body: string;
      date: string;
      type: string;
      other: string;
      place: string;
      placeHint: string;
      people: string;
      name: string;
      mail: (email: string) => string;
      submit: string;
      sent: string;
      subject: string;
    };
    back: { title: string; body: string; otherHalf: string; city: string };
  };
  dev: {
    /** El titular, en dos líneas. */
    headline: [string, string];
    lede: string;
    cta: string;
    folderCta: string;
    folders: string;
    projects: string;
    count: (n: number) => string;
    seeAll: string;
    role: string;
    visit: string;
    source: string;
    howTitle: string;
    howBody: string;
    facts: { big: string; small: string }[];
    /** Bajo la foto de «Cómo trabajo»: la frase y el texto del enlace a /alco. */
    night: { text: string; link: string };
    experience: string;
    education: string;
    now: string;
    stack: string;
    lab: string;
    prepTitle: string;
    card: {
      line: [string, string];
      title: string;
      body: string;
      company: string;
      role: string;
      roleHint: string;
      email: string;
      mail: (email: string) => string;
      submit: string;
      sent: string;
      subject: string;
    };
    back: { title: string; body: string; otherHalf: string; cv: string };
  };
  inApp: string;
  copyLink: string;
  copied: string;
  language: string;
  /** Nombre accesible del icono de correo del pie. */
  writeMe: string;
  noCookies: string;
  privacy: string;
  privacyPath: string;
  privacyPage: { title: string; paragraphs: string[]; back: string };
  notFound: { title: string; body: string; back: string };
}

export const COPY: Record<Lang, Copy> = {
  es: {
    name: 'Español',
    ogLocale: 'es_ES',
    title: {
      home: 'Pol Alcoverro · DJ e ingeniero de software',
      alco: 'ALCO · DJ en Barcelona',
      dev: 'Pol Alcoverro · Ingeniero de software',
    },
    description: {
      home: 'Pol Alcoverro: DJ con la marca ALCO e ingeniero de software en Barcelona.',
      alco: 'ALCO, DJ open format en Barcelona para bodas, festes majors, club y eventos de empresa: servicios, fotos y fechas.',
      dev: 'Pol Alcoverro, ingeniero de software en Barcelona: proyectos, experiencia y CV.',
    },
    line: {
      alco: 'DJ open format para bodas, festes majors, club y eventos de empresa.',
      dev: 'Ingeniero de software en Barcelona, de la interfaz al pipeline de datos.',
    },
    door: {
      alco: { label: 'DJ', meta: 'Servicios, fotos y fechas' },
      dev: { label: 'Ingeniero', meta: 'Proyectos, experiencia y CV' },
    },
    doc: {
      alco: { label: 'Portfolio DJ', meta: (p, s) => `PDF en inglés · ${p} ${p === 1 ? 'pág' : 'págs'} · ${s}` },
      cv: { label: 'CV', meta: (p, s) => `PDF en inglés · ${p} ${p === 1 ? 'pág' : 'págs'} · ${s}` },
    },
    home: 'Inicio',
    backHome: 'Volver a polalco.com',
    channels: 'Canal',
    prev: 'Anterior',
    next: 'Siguiente',
    rowLabel: 'Pasos; se desliza en horizontal',
    alco: {
      headline: ['Cada canción,', 'a su hora.'],
      lede: 'ALCO es Pol Alcoverro, DJ open format en Barcelona. Preparo cada evento por momentos: qué pasa en cada uno y qué tiene que sonar.',
      book: 'Pedir fecha',
      nav: { events: 'Eventos', photos: 'Fotos' },
      folders: 'Tipo de evento',
      moments: 'Momentos',
      sample: 'Ejemplo',
      real: 'evento real',
      count: (n) => `${n} momentos`,
      seeAll: 'Ver todos los momentos',
      howTitle: 'Cómo trabajo',
      howBody: 'No llevo una lista cerrada: llevo el evento ordenado por momentos y, para cada uno, más canciones de las que caben. Así puedo leer la pista y cambiar sin que se note.',
      facts: [
        { big: 'Desde 2021', small: 'bodas, festes majors, club y eventos de marca' },
        { big: 'Pioneer Opus Quad', small: 'el equipo con el que pincho, sin portátil' },
        { big: 'Penedès a Girona', small: 'Barcelona, Penedès, Anoia, Vallès, Bages y Girona' },
        { big: 'Cinco tipos de evento', small: 'de una boda a una fan zone o una entrega de medallas' },
      ],
      where: 'Dónde he pinchado',
      photo: 'Foto',
      prepTitle: 'Cómo preparo tu fecha',
      card: {
        line: ['¿Tienes una fecha', 'en mente?'],
        body: 'Te contesto con disponibilidad y presupuesto.',
        date: 'Fecha',
        type: 'Tipo de evento',
        other: 'Otro',
        place: 'Lugar',
        placeHint: 'Masía, sala, plaza…',
        people: 'Personas',
        name: 'Tu nombre',
        mail: (e) => `O escríbeme a ${e}`,
        submit: 'Pedir fecha',
        sent: 'Se abrirá tu correo con el mensaje preparado; envíalo desde ahí.',
        subject: 'Fecha para ALCO',
      },
      back: {
        title: 'La última, y a casa.',
        body: 'Si tienes una fecha, escríbeme con el día, el sitio y qué celebráis. Si es una boda, también la canción del primer baile: por ahí empezamos.',
        otherHalf: 'La otra mitad: Pol, ingeniero',
        city: 'Barcelona',
      },
    },
    dev: {
      headline: ['Cada dato,', 'en su sitio.'],
      lede: 'Pol Alcoverro, ingeniero de software en Barcelona. Construyo productos web de la interfaz al pipeline de datos; ahora, en The Etailers.',
      cta: 'Escríbeme',
      folderCta: 'Escríbeme sobre un puesto',
      folders: 'Tipo de trabajo',
      projects: 'Proyectos',
      count: (n) => `${n} ${n === 1 ? 'proyecto' : 'proyectos'}`,
      seeAll: 'Ver los proyectos',
      role: 'Mi papel:',
      visit: 'Visitar',
      source: 'Código',
      howTitle: 'Cómo trabajo',
      howBody: 'Primero acordamos qué quiere decir «terminado». Después, fases que se pueden comprobar, y cada cambio en su rama, probado en local antes de llegar a producción.',
      facts: [
        { big: 'The Etailers', small: 'ingeniero de software desde octubre de 2026' },
        { big: '9,3', small: 'la nota de mi TFG en la FIB, sobre Taiga' },
        { big: 'TypeScript', small: 'con React, Next.js y Node.js, cada día' },
        { big: 'CA · ES · EN', small: 'catalán y castellano nativos, inglés B2' },
      ],
      night: { text: 'Fuera del trabajo pincho como ALCO, en bodas, festes majors y club. Es la otra mitad de esta web:', link: 'la versión de noche' },
      experience: 'Experiencia',
      education: 'Formación',
      now: 'hoy',
      stack: 'Stack',
      lab: 'Laboratorio',
      prepTitle: 'Cómo llevo un proyecto',
      card: {
        line: ['¿Tienes un puesto', 'en mente?'],
        title: 'Escríbeme',
        body: 'Envíame el puesto, el equipo y el stack.',
        company: 'Empresa',
        role: 'Puesto',
        roleHint: 'Frontend, full stack…',
        email: 'Tu correo',
        mail: (e) => `O directamente a ${e}`,
        submit: 'Escribir a Pol',
        sent: 'Se abrirá tu correo con el mensaje preparado; envíalo desde ahí.',
        subject: 'Hola Pol, sobre un puesto',
      },
      back: {
        title: 'Mañana, a las nueve.',
        body: 'Si tienes un puesto en mente, escríbeme con el equipo y el stack. El código de mis proyectos personales está en GitHub; del trabajo para clientes te cuento cómo está hecho en una entrevista.',
        otherHalf: 'La otra mitad: ALCO, DJ',
        cv: 'CV en PDF',
      },
    },
    inApp: '¿No se abre? Ábrelo en el navegador.',
    copyLink: 'Copiar enlace',
    copied: 'Enlace copiado',
    language: 'Idioma',
    writeMe: 'Escríbeme',
    noCookies: 'Sin cookies',
    privacy: 'Privacidad',
    privacyPath: '/privacidad',
    privacyPage: {
      title: 'Privacidad',
      paragraphs: [
        'Esta web no usa cookies ni analítica, y no guarda tus datos.',
        'Está alojada en Vercel, que trata datos técnicos de cada visita (como la IP) para servirla y protegerla, según su propia política de privacidad.',
        'Responsable: Pol Alcoverro, polalcoverros@gmail.com.',
      ],
      back: 'Volver al inicio',
    },
    notFound: {
      title: 'Esta página no existe',
      body: 'Puede que el enlace esté mal escrito.',
      back: 'Ir al inicio',
    },
  },
  ca: {
    name: 'Català',
    ogLocale: 'ca_ES',
    title: {
      home: 'Pol Alcoverro · DJ i enginyer de programari',
      alco: 'ALCO · DJ a Barcelona',
      dev: 'Pol Alcoverro · Enginyer de programari',
    },
    description: {
      home: 'Pol Alcoverro: DJ amb la marca ALCO i enginyer de programari a Barcelona.',
      alco: "ALCO, DJ open format a Barcelona per a casaments, festes majors, club i esdeveniments d'empresa: serveis, fotos i dates.",
      dev: 'Pol Alcoverro, enginyer de programari a Barcelona: projectes, experiència i CV.',
    },
    line: {
      alco: "DJ open format per a casaments, festes majors, club i esdeveniments d'empresa.",
      dev: 'Enginyer de programari a Barcelona, de la interfície al pipeline de dades.',
    },
    door: {
      alco: { label: 'DJ', meta: 'Serveis, fotos i dates' },
      dev: { label: 'Enginyer', meta: 'Projectes, experiència i CV' },
    },
    doc: {
      alco: { label: 'Portfolio DJ', meta: (p, s) => `PDF en anglès · ${p} pàg. · ${s}` },
      cv: { label: 'CV', meta: (p, s) => `PDF en anglès · ${p} pàg. · ${s}` },
    },
    home: 'Inici',
    backHome: 'Torna a polalco.com',
    channels: 'Canal',
    prev: 'Anterior',
    next: 'Següent',
    rowLabel: 'Passos; es llisca en horitzontal',
    alco: {
      headline: ['Cada cançó,', 'a la seva hora.'],
      lede: "ALCO és Pol Alcoverro, DJ open format a Barcelona. Preparo cada esdeveniment per moments: què passa en cadascun i què hi ha de sonar.",
      book: 'Demana data',
      nav: { events: 'Esdeveniments', photos: 'Fotos' },
      folders: "Tipus d'esdeveniment",
      moments: 'Moments',
      sample: 'Exemple',
      real: 'esdeveniment real',
      count: (n) => `${n} moments`,
      seeAll: 'Mira tots els moments',
      howTitle: 'Com treballo',
      howBody: "No porto una llista tancada: porto l'esdeveniment ordenat per moments i, per a cadascun, més cançons de les que hi caben. Així puc llegir la pista i canviar sense que es noti.",
      facts: [
        { big: 'Des del 2021', small: "casaments, festes majors, club i esdeveniments de marca" },
        { big: 'Pioneer Opus Quad', small: "l'equip amb què punxo, sense portàtil" },
        { big: 'Del Penedès a Girona', small: 'Barcelona, Penedès, Anoia, Vallès, Bages i Girona' },
        { big: "Cinc tipus d'esdeveniment", small: "d'un casament a una fan zone o un lliurament de medalles" },
      ],
      where: 'On he punxat',
      photo: 'Foto',
      prepTitle: 'Com preparo la teva data',
      card: {
        line: ['Tens una data', 'al cap?'],
        body: 'Et responc amb disponibilitat i pressupost.',
        date: 'Data',
        type: "Tipus d'esdeveniment",
        other: 'Un altre',
        place: 'Lloc',
        placeHint: 'Masia, sala, plaça…',
        people: 'Persones',
        name: 'El teu nom',
        mail: (e) => `O escriu-me a ${e}`,
        submit: 'Demana data',
        sent: "S'obrirà el teu correu amb el missatge preparat; envia'l des d'allà.",
        subject: 'Data per a ALCO',
      },
      back: {
        title: "L'última, i cap a casa.",
        body: "Si tens una data, escriu-me amb el dia, el lloc i què celebreu. Si és un casament, també la cançó del primer ball: per aquí comencem.",
        otherHalf: "L'altra meitat: Pol, enginyer",
        city: 'Barcelona',
      },
    },
    dev: {
      headline: ['Cada dada,', 'al seu lloc.'],
      lede: 'Pol Alcoverro, enginyer de programari a Barcelona. Construeixo productes web de la interfície al pipeline de dades; ara, a The Etailers.',
      cta: 'Escriu-me',
      folderCta: 'Escriu-me sobre una feina',
      folders: 'Tipus de feina',
      projects: 'Projectes',
      count: (n) => `${n} ${n === 1 ? 'projecte' : 'projectes'}`,
      seeAll: 'Mira els projectes',
      role: 'El meu paper:',
      visit: 'Visita',
      source: 'Codi',
      howTitle: 'Com treballo',
      howBody: "Primer acordem què vol dir «acabat». Després, fases que es poden comprovar, i cada canvi a la seva branca, provat en local abans d'arribar a producció.",
      facts: [
        { big: 'The Etailers', small: "enginyer de programari des de l'octubre del 2026" },
        { big: '9,3', small: 'la nota del meu TFG a la FIB, sobre Taiga' },
        { big: 'TypeScript', small: 'amb React, Next.js i Node.js, cada dia' },
        { big: 'CA · ES · EN', small: 'català i castellà nadius, anglès B2' },
      ],
      night: { text: "Fora de la feina punxo com a ALCO, en casaments, festes majors i club. És l'altra meitat d'aquest web:", link: 'la versió de nit' },
      experience: 'Experiència',
      education: 'Formació',
      now: 'avui',
      stack: 'Stack',
      lab: 'Laboratori',
      prepTitle: 'Com porto un projecte',
      card: {
        line: ['Tens una feina', 'al cap?'],
        title: 'Escriu-me',
        body: "Envia'm el lloc, l'equip i l'stack.",
        company: 'Empresa',
        role: 'Lloc de feina',
        roleHint: 'Frontend, full stack…',
        email: 'El teu correu',
        mail: (e) => `O directament a ${e}`,
        submit: 'Escriu a Pol',
        sent: "S'obrirà el teu correu amb el missatge preparat; envia'l des d'allà.",
        subject: 'Hola Pol, sobre una feina',
      },
      back: {
        title: 'Demà, a les nou.',
        body: "Si tens una feina al cap, escriu-me amb l'equip i l'stack. El codi dels meus projectes personals és a GitHub; de la feina per a clients t'explico com està feta en una entrevista.",
        otherHalf: "L'altra meitat: ALCO, DJ",
        cv: 'CV en PDF',
      },
    },
    inApp: "No s'obre? Obre'l al navegador.",
    copyLink: "Copia l'enllaç",
    copied: 'Enllaç copiat',
    language: 'Idioma',
    writeMe: 'Escriu-me',
    noCookies: 'Sense galetes',
    privacy: 'Privacitat',
    privacyPath: '/ca/privacitat',
    privacyPage: {
      title: 'Privacitat',
      paragraphs: [
        'Aquest web no fa servir galetes ni analítica, i no desa les teves dades.',
        "Està allotjat a Vercel, que tracta dades tècniques de cada visita (com la IP) per servir-lo i protegir-lo, segons la seva pròpia política de privacitat.",
        'Responsable: Pol Alcoverro, polalcoverros@gmail.com.',
      ],
      back: "Torna a l'inici",
    },
    notFound: {
      title: 'Aquesta pàgina no existeix',
      body: "Potser l'enllaç està mal escrit.",
      back: "Ves a l'inici",
    },
  },
  en: {
    name: 'English',
    ogLocale: 'en_GB',
    title: {
      home: 'Pol Alcoverro · DJ and software engineer',
      alco: 'ALCO · DJ in Barcelona',
      dev: 'Pol Alcoverro · Software engineer',
    },
    description: {
      home: 'Pol Alcoverro: DJ under the name ALCO and software engineer in Barcelona.',
      alco: 'ALCO, open format DJ in Barcelona for weddings, festes majors, clubs and corporate events: services, photos and dates.',
      dev: 'Pol Alcoverro, software engineer in Barcelona: projects, experience and CV.',
    },
    line: {
      alco: 'Open format DJ for weddings, festes majors, clubs and corporate events.',
      dev: 'Software engineer in Barcelona, from the interface to the data pipeline.',
    },
    door: {
      alco: { label: 'DJ', meta: 'Services, photos and dates' },
      dev: { label: 'Engineer', meta: 'Projects, experience and CV' },
    },
    doc: {
      alco: { label: 'DJ portfolio', meta: (p, s) => `PDF · ${p} ${p === 1 ? 'page' : 'pages'} · ${s}` },
      cv: { label: 'CV', meta: (p, s) => `PDF · ${p} ${p === 1 ? 'page' : 'pages'} · ${s}` },
    },
    home: 'Home',
    backHome: 'Back to polalco.com',
    channels: 'Channel',
    prev: 'Previous',
    next: 'Next',
    rowLabel: 'Steps; scrolls sideways',
    alco: {
      headline: ['Every song,', 'right on time.'],
      lede: 'ALCO is Pol Alcoverro, an open format DJ in Barcelona. I plan every event moment by moment: what happens in each one and what needs to play.',
      book: 'Check a date',
      nav: { events: 'Events', photos: 'Photos' },
      folders: 'Kind of event',
      moments: 'Moments',
      sample: 'Example',
      real: 'real event',
      count: (n) => `${n} moments`,
      seeAll: 'See every moment',
      howTitle: 'How I work',
      howBody: "I don't bring a fixed list. I bring the event in order, moment by moment, with more songs for each than will fit, so I can read the floor and change course without anyone noticing.",
      facts: [
        { big: 'Since 2021', small: 'weddings, town festivals, clubs and brand events' },
        { big: 'Pioneer Opus Quad', small: 'my own decks, no laptop' },
        { big: 'Penedès to Girona', small: 'Barcelona, Penedès, Anoia, Vallès, Bages and Girona' },
        { big: 'Five kinds of event', small: 'from a wedding to a fan zone or a medal ceremony' },
      ],
      where: "Where I've played",
      photo: 'Photo',
      prepTitle: 'How I prepare your date',
      card: {
        line: ['Have a date', 'in mind?'],
        body: "I'll reply with availability and a quote.",
        date: 'Date',
        type: 'Kind of event',
        other: 'Other',
        place: 'Venue',
        placeHint: 'Farmhouse, venue, square…',
        people: 'Guests',
        name: 'Your name',
        mail: (e) => `Or email me at ${e}`,
        submit: 'Check a date',
        sent: 'Your email app will open with the message ready; send it from there.',
        subject: 'Date for ALCO',
      },
      back: {
        title: 'One last song, then home.',
        body: "If you have a date, email me with the day, the venue and what you're celebrating. If it's a wedding, add your first dance song too: that's where we start.",
        otherHalf: 'The other half: Pol, engineer',
        city: 'Barcelona',
      },
    },
    dev: {
      headline: ['Every number,', 'in its place.'],
      lede: 'Pol Alcoverro, software engineer in Barcelona. I build web products from the interface to the data pipeline, now at The Etailers.',
      cta: 'Email me',
      folderCta: 'Email me about a role',
      folders: 'Kind of work',
      projects: 'Projects',
      count: (n) => `${n} ${n === 1 ? 'project' : 'projects'}`,
      seeAll: 'See the projects',
      role: 'My role:',
      visit: 'Visit',
      source: 'Source',
      howTitle: 'How I work',
      howBody: 'First we agree on what “done” means. Then come phases that can be checked, and every change on its own branch, tested locally before it reaches production.',
      facts: [
        { big: 'The Etailers', small: 'software engineer since October 2026' },
        { big: '9.3', small: 'the grade of my final thesis at FIB, on Taiga' },
        { big: 'TypeScript', small: 'with React, Next.js and Node.js, every day' },
        { big: 'CA · ES · EN', small: 'native Catalan and Spanish, B2 English' },
      ],
      night: { text: 'Outside work I DJ as ALCO, at weddings, town festivals and clubs. It is the other half of this site:', link: 'the night version' },
      experience: 'Experience',
      education: 'Education',
      now: 'present',
      stack: 'Stack',
      lab: 'Lab',
      prepTitle: 'How I run a project',
      card: {
        line: ['Have a role', 'in mind?'],
        title: 'Email me',
        body: 'Send me the role, the team and the stack.',
        company: 'Company',
        role: 'Role',
        roleHint: 'Frontend, full stack…',
        email: 'Your email',
        mail: (e) => `Or straight to ${e}`,
        submit: 'Write to Pol',
        sent: 'Your email app will open with the message ready; send it from there.',
        subject: 'Hello Pol, about a role',
      },
      back: {
        title: 'Tomorrow, at nine.',
        body: 'If you have a role in mind, email me with the team and the stack. The code for my personal projects is on GitHub; for client work, I can walk you through how it is built in an interview.',
        otherHalf: 'The other half: ALCO, DJ',
        cv: 'CV (PDF)',
      },
    },
    inApp: 'Not opening? Open it in your browser.',
    copyLink: 'Copy link',
    copied: 'Link copied',
    language: 'Language',
    writeMe: 'Email me',
    noCookies: 'No cookies',
    privacy: 'Privacy',
    privacyPath: '/en/privacy',
    privacyPage: {
      title: 'Privacy',
      paragraphs: [
        'This site uses no cookies or analytics and does not store your data.',
        'It is hosted on Vercel, which processes technical data from each visit (such as your IP address) to serve and protect it, under its own privacy policy.',
        'Controller: Pol Alcoverro, polalcoverros@gmail.com.',
      ],
      back: 'Back to the home page',
    },
    notFound: {
      title: 'This page does not exist',
      body: 'The link may be mistyped.',
      back: 'Go to the home page',
    },
  },
};

export const LINKS = {
  email: 'polalcoverros@gmail.com',
  instagram: 'https://www.instagram.com/pol.alco/',
  linkedin: 'https://www.linkedin.com/in/pol-alcoverro-sabat%C3%A9-6519192a1/',
  github: 'https://github.com/polalco13',
};
