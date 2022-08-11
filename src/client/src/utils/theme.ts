import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    colors?: {
      cross?: string;
      circle?: string;
      accent?: string;
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
      cross: "#D68FD6",
      circle: "#F9DC5C",
      accent: "#C2EABD",
    },
  },
});

export const gameGrid = {
  display: "grid",
  gap: "15px",
  gridTemplateColumns: "repeat(3, minmax(10px, 1fr))",
  gridTemplateRows: "repeat(3, minmax(10px, 1fr))",
};
