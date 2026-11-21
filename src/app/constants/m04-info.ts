import { WEDDING_INFO } from '../shared/constants/wedding-info';
import { ACTIVE_THEME } from '../shared/themes/active-theme';

export type Model04TimelineIcon =
  | 'reception'
  | 'entrance'
  | 'toast'
  | 'dinner'
  | 'party';

export type Model04TimelineSide = 'left' | 'right';

export interface Model04TimelineItem {
  time: string;
  label: string;
  icon: Model04TimelineIcon;
  side: Model04TimelineSide;
}

export interface Model04CountdownLabels {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const reception = WEDDING_INFO.events.ceremony;

export const MODEL_04_INFO = {
  hero: {
    quote: WEDDING_INFO.quote.text,
    quoteReference: WEDDING_INFO.quote.reference,
    monogram: WEDDING_INFO.couple.monogram,
    kicker: '¡NOS CASAMOS!',
    title: WEDDING_INFO.couple.fullName,
    husbandName: WEDDING_INFO.couple.husbandName,
    wifeName: WEDDING_INFO.couple.wifeName,
    date: WEDDING_INFO.dates.displayDate,
    dateParts: {
      dayOfWeek: WEDDING_INFO.dates.dayOfWeek,
      day: WEDDING_INFO.dates.day,
      month: WEDDING_INFO.dates.month,
      year: WEDDING_INFO.dates.year,
    },
    photo: WEDDING_INFO.assets.heroPhoto,
    photoAlt: `${WEDDING_INFO.couple.husbandName} y ${WEDDING_INFO.couple.wifeName}`,
    floralTl: WEDDING_INFO.assets.floralHeroTl,
    floralNamesLeft: WEDDING_INFO.assets.floralNamesSide,
    floralNamesRight: WEDDING_INFO.assets.floralNamesSide,
    husbandInitial: WEDDING_INFO.couple.husbandName.charAt(0),
    wifeInitial: WEDDING_INFO.couple.wifeName.charAt(0),
    parents: WEDDING_INFO.parents,
  },

  countdown: {
    targetDate: WEDDING_INFO.dates.weddingDate,
    title: 'FALTAN',
    labels: {
      days: 'Dias',
      hours: 'Horas',
      minutes: 'Min',
      seconds: 'Seg',
    } satisfies Model04CountdownLabels,
  },

  decoration: ACTIVE_THEME.assets.decoration,

  reception: {
    timeLabel: reception.timeLabel,
    title: reception.title.toLocaleUpperCase('es-CO'),
    place: reception.place.toLocaleUpperCase('es-CO'),
    address: reception.address,
    mapsUrl: reception.mapsUrl,
    mapsCta: 'Ver ubicación',
    photo: WEDDING_INFO.assets.receptionPhoto,
    photoAlt: `${WEDDING_INFO.couple.husbandName} y ${WEDDING_INFO.couple.wifeName}`,
    closeupPhoto: WEDDING_INFO.assets.closeupPhoto,
    closeupAlt: `${WEDDING_INFO.couple.husbandName} y ${WEDDING_INFO.couple.wifeName}`,
  },

  timeline: {
    title: 'Itinerario de Actividades',
    items: [
      { time: '17:00', label: 'Recepción', icon: 'reception', side: 'right' },
      { time: '17:30', label: 'Entrada de Novios', icon: 'entrance', side: 'left' },
      { time: '18:00', label: 'Brindis', icon: 'toast', side: 'right' },
      { time: '18:30', label: 'Banquete', icon: 'dinner', side: 'left' },
      { time: '19:00', label: 'Fiesta', icon: 'party', side: 'right' },
    ] as const satisfies readonly Model04TimelineItem[],
  },

  dressCode: WEDDING_INFO.sections.dressCode,
  gifts: WEDDING_INFO.sections.gifts,

  rsvp: {
    title: 'Confirmar Asistencia',
    text: 'Agradecemos que confirmes tu asistencia antes del',
    deadline: WEDDING_INFO.confirmation.deadlineShort,
    confirmButtonText: 'Confírmanos',
  },

  confirmationGuide: {
    title: 'No olvides confirmar tu asistencia',
    text: 'Tu confirmación nos ayuda a organizar todo. Solo te tomará un momento.',
    confirmButton: 'Confirmar asistencia',
    laterButton: 'Más tarde',
  },

  closing: {
    thankYou: 'Muchas Gracias!',
    message: 'Esperamos contar con su presencia',
    photo: WEDDING_INFO.assets.closingPhoto,
    photoAlt: `${WEDDING_INFO.couple.husbandName} y ${WEDDING_INFO.couple.wifeName}`,
  },
};
