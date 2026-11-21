import { BASE_THEME_ANIMATIONS, BASE_THEME_ASSETS } from './theme-assets';
import { WeddingTheme } from './theme.types';

export const TEMPLATE_STARTER_A: WeddingTheme = {
  name: 'starter-a',
  displayName: 'Boho Terracota',
  palette: {
    primary: '#B05E3C',
    primaryDark: '#8A4A2F',
    primarySoft: '#C47A5A',
    primaryLight: '#E8C4B0',
    coupleSeparatorText: '#B05E3C',
    cardHeading: '#9A5638',
    accent: '#C4A574',
    heading: '#3D2E26',
    text: '#4A3B32',
    surface: '#F7F1E8',
    surfaceAlt: '#EFE6DA',
    muted: '#8A7A6E',
    overlay: 'rgba(176, 94, 60, 0.55)',
    success: '#B05E3C',
    info: '#9A5638',
    border: '#D9C8B8',
  },
  assets: BASE_THEME_ASSETS,
  animations: BASE_THEME_ANIMATIONS,
};
