import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    colors: {
      cross: string;
      circle: string;
      accent: string;
    };
  }

  interface PaletteOptions {
    colors?: {
      cross?: string;
      circle?: string;
      accent?: string;
    };
  }
}

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#192a32",
      paper: "#1f3540",
    },
    colors: {
      cross: "#31c4be",
      circle: "#f2b237",
      accent: "#a8bdc9",
    },
  },
});

export const gameGrid = {
  display: "grid",
  gap: "4%",
  gridTemplateColumns: "repeat(3, minmax(10px, 1fr))",
  gridTemplateRows: "repeat(3, minmax(10px, 1fr))",
};

export const borderRadius = "10px";
