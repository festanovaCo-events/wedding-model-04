import { ACTIVE_THEME } from '../themes/active-theme';
import {
  buildGoogleCalendarUrl,
  formatBannerDate,
  formatEventDateLabel,
  formatLongDate,
  formatModelDate,
  formatModelTime,
  instagramExploreUrl,
  toGoogleCalendarStamp,
} from '../utils/wedding-datetime';

const HUSBAND_NAME = 'Carlos';
const WIFE_NAME = 'Camila';
const HASHTAG = `#${HUSBAND_NAME}Y${WIFE_NAME}`;
const CALENDAR_DETAILS = 'Te esperamos en este momento especial.';

const RECEPTION_START = '2026-12-19T17:00:00-05:00';
const RECEPTION_END = '2026-12-19T23:00:00-05:00';
const CONFIRMATION_DEADLINE = '2026-12-05T23:59:59-05:00';

const RECEPTION_PLACE = 'Salón de Eventos Jardín';
const RECEPTION_ADDRESS = 'C. Aquiles Serdán 1633, Benito Juárez Nte, Coatzacoalcos, Veracruz';
const RECEPTION_MAPS_QUERY =
  'C. Aquiles Serdán 1633, Benito Juárez Nte, Coatzacoalcos, Veracruz';

/** Entrada: 'letter' abre una carta al hacer clic; 'heart' usa el loader del corazón. */
export type EntranceAnimation = 'heart' | 'letter';

function entranceAnimation(): EntranceAnimation {
  return 'letter';
}

function calendarUrl(title: string, startsAt: string, endsAt: string, location: string): string {
  return buildGoogleCalendarUrl({
    title: `Boda de ${HUSBAND_NAME} y ${WIFE_NAME} (${title})`,
    startsAt,
    endsAt,
    location,
    details: CALENDAR_DETAILS,
  });
}

const modelDate = formatModelDate(RECEPTION_START);

export const WEDDING_INFO = {
  entrance: entranceAnimation(),

  couple: {
    husbandName: HUSBAND_NAME,
    wifeName: WIFE_NAME,
    fullName: `${HUSBAND_NAME} & ${WIFE_NAME}`,
    monogram: `${HUSBAND_NAME.charAt(0)} | ${WIFE_NAME.charAt(0)}`,
    hashtag: HASHTAG,
  },

  confirmation: {
    deadline: CONFIRMATION_DEADLINE,
    deadlineLabel: formatLongDate(CONFIRMATION_DEADLINE),
    deadlineShort: '05 de diciembre',
  },

  contacts: {
    bride: {
      label: 'Contacto novia',
      url: 'https://wa.me/520000000000',
    },
    groom: {
      label: 'Contacto novio',
      url: 'https://wa.me/520000000000',
    },
  },

  dates: {
    bannerDate: formatBannerDate(RECEPTION_START),
    weddingDate: RECEPTION_START,
    ceremonyDate: formatEventDateLabel(RECEPTION_START),
    partyDate: formatEventDateLabel(RECEPTION_START),
    ceremonyDateTimeISO: toGoogleCalendarStamp(RECEPTION_START),
    ceremonyEndDateTimeISO: toGoogleCalendarStamp(RECEPTION_END),
    partyDateTimeISO: toGoogleCalendarStamp(RECEPTION_START),
    partyEndDateTimeISO: toGoogleCalendarStamp(RECEPTION_END),
    displayDate: `${modelDate.dayOfWeek} ${modelDate.day} ${modelDate.month} ${modelDate.year}`,
    dayOfWeek: modelDate.dayOfWeek,
    day: modelDate.day,
    month: modelDate.month,
    year: modelDate.year,
  },

  quote: {
    text: 'Y sobre todas estas cosas, vístanse de amor, que es el vínculo perfecto',
    reference: 'Colosenses 3:14',
  },

  parents: {
    intro: 'Con nuestro amor, la bendición de Dios y la de nuestros padres:',
    nosotros: 'Nosotros',
    inviteHonor: 'Tenemos el honor de invitarte a celebrar nuestra unión en matrimonio',
    bride: {
      label: 'Padres de la novia',
      names: ['Milena Sanchez Loza', 'Pablo Martinez Gomez'],
    },
    groom: {
      label: 'Padres del novio',
      names: ['Yolanda Suarez Justiniano', 'Victor Valverde Antelo'],
    },
  },

  events: {
    ceremony: {
      title: 'Recepción',
      place: RECEPTION_PLACE,
      address: RECEPTION_ADDRESS,
      location: `${RECEPTION_PLACE}, ${RECEPTION_ADDRESS}`,
      date: formatEventDateLabel(RECEPTION_START),
      time: formatModelTime(RECEPTION_START),
      timeLabel: '17:00 HRS.',
      startsAt: RECEPTION_START,
      endsAt: RECEPTION_END,
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RECEPTION_MAPS_QUERY)}`,
      calendarUrl: calendarUrl(
        'Recepción',
        RECEPTION_START,
        RECEPTION_END,
        `${RECEPTION_PLACE}, ${RECEPTION_ADDRESS}`,
      ),
    },
    party: {
      title: 'Fiesta',
      place: RECEPTION_PLACE,
      address: RECEPTION_ADDRESS,
      location: `${RECEPTION_PLACE}, ${RECEPTION_ADDRESS}`,
      date: formatEventDateLabel(RECEPTION_START),
      time: formatModelTime(RECEPTION_START),
      startsAt: RECEPTION_START,
      endsAt: RECEPTION_END,
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RECEPTION_MAPS_QUERY)}`,
      calendarUrl: calendarUrl(
        'Fiesta',
        RECEPTION_START,
        RECEPTION_END,
        `${RECEPTION_PLACE}, ${RECEPTION_ADDRESS}`,
      ),
    },
  },

  music: {
    url: ACTIVE_THEME.assets.music,
    volume: 0.3,
    loop: true,
  },

  assets: {
    bannerImage: ACTIVE_THEME.assets.bannerImage,
    decoration: ACTIVE_THEME.assets.decoration,
    floralHeroTl: 'assets/images/florals/floral-magnolia.png',
    floralNamesSide: 'assets/images/florals/floral-names-side.jpg',
    heroPhoto: 'assets/images/couple-hero.jpg',
    receptionPhoto: 'assets/images/couple-reception.jpg',
    closeupPhoto: 'assets/images/couple-closeup.jpg',
    closingPhoto: 'assets/images/couple-closing.jpg',
  },

  animations: ACTIVE_THEME.animations,

  sections: {
    gifts: {
      title: 'Sugerencia de Regalos',
      description:
        'El mejor regalo es tu presencia, pero si deseas tener un detalle con nosotros, les dejamos estas opciones:',
      envelopeLabel: 'Lluvia de sobres',
      transferLabel: 'Transferencia',
      bankDetails: ['AAAA BBBBB', 'CCCC DDDDD', 'EEEEEE'],
    },
    dressCode: {
      title: 'Código de Vestimenta',
      label: 'Semi formal',
      note: 'Con mucho cariño les pedimos evitar prendas en color blanco y beige.',
    },
    instagram: {
      title: 'Fotos del día',
      description: 'Invita a compartir las fotos de la celebración.',
      buttonText: 'Ver en Instagram',
      hashtag: HASHTAG,
      url: instagramExploreUrl(HASHTAG),
    },
  },
};
