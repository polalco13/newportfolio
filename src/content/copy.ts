// Todo el texto de la web, por idioma. Los componentes no escriben texto propio.
import type { DocId, Lang } from '../../shared/site';

export type Focus = 'home' | DocId;

interface Copy {
  /** Nombre del idioma en ese idioma, para el selector. */
  name: string;
  ogLocale: string;
  title: Record<Focus, string>;
  description: Record<Focus, string>;
  /** Una línea solo en /alco y /cv; la portada no lleva frase. */
  line: Record<DocId, string>;
  doc: Record<DocId, { label: string; meta: (pages: number, size: string) => string }>;
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
      alco: 'ALCO · Portfolio DJ',
      cv: 'Pol Alcoverro · CV de ingeniero de software',
    },
    description: {
      home: 'Pol Alcoverro: DJ con la marca ALCO e ingeniero de software en Barcelona. Descarga el portfolio de DJ o el CV.',
      alco: 'ALCO, DJ open format en Barcelona para bodas, festes majors, club y eventos de empresa. Descarga el portfolio.',
      cv: 'Pol Alcoverro, ingeniero de software en Barcelona. Descarga el CV.',
    },
    line: {
      alco: 'DJ open format para bodas, festes majors, club y eventos de empresa.',
      cv: 'Ingeniero de software en Barcelona, de la interfaz al pipeline de datos.',
    },
    doc: {
      alco: { label: 'Portfolio DJ', meta: (p, s) => `PDF en inglés · ${p} ${p === 1 ? 'pág' : 'págs'} · ${s}` },
      cv: { label: 'CV', meta: (p, s) => `PDF en inglés · ${p} ${p === 1 ? 'pág' : 'págs'} · ${s}` },
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
      alco: 'ALCO · Portfolio DJ',
      cv: "Pol Alcoverro · CV d'enginyer de programari",
    },
    description: {
      home: 'Pol Alcoverro: DJ amb la marca ALCO i enginyer de programari a Barcelona. Descarrega el portfolio de DJ o el CV.',
      alco: "ALCO, DJ open format a Barcelona per a casaments, festes majors, club i esdeveniments d'empresa. Descarrega el portfolio.",
      cv: 'Pol Alcoverro, enginyer de programari a Barcelona. Descarrega el CV.',
    },
    line: {
      alco: "DJ open format per a casaments, festes majors, club i esdeveniments d'empresa.",
      cv: 'Enginyer de programari a Barcelona, de la interfície al pipeline de dades.',
    },
    doc: {
      alco: { label: 'Portfolio DJ', meta: (p, s) => `PDF en anglès · ${p} pàg. · ${s}` },
      cv: { label: 'CV', meta: (p, s) => `PDF en anglès · ${p} pàg. · ${s}` },
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
      alco: 'ALCO · DJ portfolio',
      cv: 'Pol Alcoverro · Software engineer CV',
    },
    description: {
      home: 'Pol Alcoverro: DJ under the name ALCO and software engineer in Barcelona. Download the DJ portfolio or the CV.',
      alco: 'ALCO, open format DJ in Barcelona for weddings, festes majors, clubs and corporate events. Download the portfolio.',
      cv: 'Pol Alcoverro, software engineer in Barcelona. Download the CV.',
    },
    line: {
      alco: 'Open format DJ for weddings, festes majors, clubs and corporate events.',
      cv: 'Software engineer in Barcelona, from the interface to the data pipeline.',
    },
    doc: {
      alco: { label: 'DJ portfolio', meta: (p, s) => `PDF · ${p} ${p === 1 ? 'page' : 'pages'} · ${s}` },
      cv: { label: 'CV', meta: (p, s) => `PDF · ${p} ${p === 1 ? 'page' : 'pages'} · ${s}` },
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
