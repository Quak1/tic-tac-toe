import { Box } from "@mui/material";

import ScoreDisplay from "./ScoreDisplay";
import { gameGrid } from "../../utils/theme";

const styles = {
  ...gameGrid,
  justifyContent: "space-between",
  maxWidth: "500px",
  textAlign: "center",
};

interface Props {
  score: {
    x: number;
    o: number;
    tie: number;
  };
}

const Footer = ({ score }: Props) => {
  return (
    <Box sx={styles}>
      <ScoreDisplay player="x" score={score.x} />
      <ScoreDisplay player="tie" score={score.tie} />
      <ScoreDisplay player="o" score={score.o} />
    </Box>
  );
};

export default Footer;
