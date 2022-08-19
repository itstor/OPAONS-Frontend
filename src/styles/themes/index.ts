import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';

import colors from '@/styles/colors/theme-colors.module.scss';

import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

export type IThemeOption = {
  colors: { readonly [key: string]: string };
  heading: string;
  paper: string;
  backgroundDefault: string;
  background: string;
  darkTextPrimary: string;
  darkTextSecondary: string;
  textDark: string;
  menuSelected: string;
  menuSelectedBack: string;
  divider: string;
  fontFamily: string;
  borderRadius: number;
};

export const theme = (): Theme => {
  const color = colors;

  const themeOption: IThemeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.background,
    background: color.primaryLight,
    darkTextPrimary: color.grey900,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: '#d8b583',
    divider: color.grey200,
    fontFamily: 'Poppins, sans-serif',
    borderRadius: 8,
  };

  const themeOptions: ThemeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes: Theme = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
