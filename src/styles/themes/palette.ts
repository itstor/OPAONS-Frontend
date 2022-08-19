import { PaletteOptions, SimplePaletteColorOptions } from '@mui/material';
import { ColorPartial } from '@mui/material/styles/createPalette';

import { IThemeOption } from '@/styles/themes';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    orange?: Palette['primary'];
  }
  interface PaletteOptions {
    orange?: PaletteOptions['primary'];
  }
  interface TypeText {
    dark?: string | undefined;
    hint?: string | undefined;
  }
}

interface DefaultPaletteOptions extends PaletteOptions {
  primary?: ColorPartial & SimplePaletteColorOptions;
  secondary?: ColorPartial & SimplePaletteColorOptions;
}

export default function themePalette(theme: IThemeOption): DefaultPaletteOptions {
  return {
    common: {
      black: theme.colors?.darkPaper,
    },
    primary: {
      light: theme.colors?.primaryLight,
      main: theme.colors?.primaryMain,
      dark: theme.colors?.primaryDark,
      100: theme.colors?.primary100,
      200: theme.colors?.primary200,
      300: theme.colors?.primary300,
      400: theme.colors?.primary400,
      500: theme.colors?.primary500,
      600: theme.colors?.primary600,
      700: theme.colors?.primary700,
      800: theme.colors?.primary800,
      900: theme.colors?.primary900,
    },
    secondary: {
      light: theme.colors?.secondaryLight,
      main: theme.colors?.secondaryMain,
      dark: theme.colors?.secondaryDark,
      100: theme.colors?.secondary100,
      200: theme.colors?.secondary200,
      300: theme.colors?.secondary300,
      400: theme.colors?.secondary400,
      500: theme.colors?.secondary500,
      600: theme.colors?.secondary600,
      700: theme.colors?.secondary700,
      800: theme.colors?.secondary800,
      900: theme.colors?.secondary900,
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain,
      dark: theme.colors?.errorDark,
    },
    warning: {
      light: theme.colors?.warningLight,
      main: theme.colors?.warningMain,
      dark: theme.colors?.warningDark,
    },
    success: {
      light: theme.colors?.successLight,
      200: theme.colors?.success200,
      main: theme.colors?.successMain,
      dark: theme.colors?.successDark,
    },
    grey: {
      50: theme.colors?.grey50,
      100: theme.colors?.grey100,
      500: theme.darkTextSecondary,
      600: theme.heading,
      700: theme.darkTextPrimary,
      900: theme.textDark,
    },
    text: {
      primary: theme.darkTextPrimary,
      secondary: theme.darkTextSecondary,
      dark: theme.textDark,
      hint: theme.colors?.grey100,
    },
    background: {
      paper: theme.paper,
      default: theme.backgroundDefault,
    },
    orange: {
      light: theme.colors?.orangeLight,
      main: theme.colors?.orangeMain,
      dark: theme.colors?.orangeDark,
    },
  };
}
