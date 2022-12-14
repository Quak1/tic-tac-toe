import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import GameContainer from "./components/GameContainer";
import Header from "./components/Header";
import { darkTheme } from "./utils/theme";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      <GameContainer />
    </ThemeProvider>
  );
}

export default App;
