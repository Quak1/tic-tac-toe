import { Box } from "@mui/material";

import { Player } from "../../utils/types";
import { borderRadius } from "../../utils/theme";

interface Props {
  score: number;
  player: Player | "tie";
}

const ScoreDisplay = ({ score, player }: Props) => {
  const label = player === "tie" ? "ties" : player + " player";

  const backgroundColor =
    player === "tie" ? "accent" : player === "x" ? "cross" : "circle";

  const styles = {
    flexGrow: 1,
    backgroundColor: "colors." + backgroundColor,
    color: "background.default",
    borderRadius: borderRadius,
  };

  return (
    <Box sx={styles}>
      <div>{label}</div>
      <div>{score}</div>
    </Box>
  );
};

export default ScoreDisplay;
