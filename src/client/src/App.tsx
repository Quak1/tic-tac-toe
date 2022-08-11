import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Game from "./components/Game";
import { darkTheme } from "./utils/theme";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Game />
    </ThemeProvider>
  );
}

export default App;
