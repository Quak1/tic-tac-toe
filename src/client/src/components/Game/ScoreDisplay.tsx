import { Box, Typography } from "@mui/material";

import { Player } from "../../utils/types";
import { borderRadius, gameGrid } from "../../utils/theme";

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
    padding: "10px 0",
  };

  return (
    <Box sx={styles}>
      <Typography sx={{ fontWeight: "bold", fontSize: 12 }}>
        {label.toUpperCase()}
      </Typography>
      <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>{score}</Typography>
    </Box>
  );
};

export default ScoreDisplay;
