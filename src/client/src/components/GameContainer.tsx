import { Box } from "@mui/system";
import Game from "./Game/Online";

const styles = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const GameContainer = () => {
  return (
    <Box sx={styles}>
      <Game />
    </Box>
  );
};

export default GameContainer;
