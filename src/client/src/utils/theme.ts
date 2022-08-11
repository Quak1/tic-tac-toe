import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    colors?: {
      papaya?: string;
    };
  }
}

export const theme = {
  colors: {
    background: "#011936",
    cross: "#ED254E",
    circle: "#F9DC5C",
    accent: "#C2EABD",
  },
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#011936",
      paper: "#022550",
    },
    colors: {
      papaya: "#bbb",
    },
  },
});
