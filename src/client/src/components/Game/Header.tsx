import { Box, IconButton, Typography } from "@mui/material";
import { Replay as ReplayIcon } from "@mui/icons-material";

import Circle from "../Icons/Circle";
import Cross from "../Icons/Cross";
import { Player } from "../../utils/types";
import { gameGrid, darkTheme, borderRadius } from "../../utils/theme";

const styles = {
  container: {
    ...gameGrid,
    alignItems: "center",
    justifyItems: "center",
    maxWidth: 500,
    height: 40,
  },
  iconsContainer: {
    display: "flex",
    justifySelf: "start",
    "& svg": {
      height: "20px",
      width: "20px",
      marginRight: 1,
    },
  },
  playerLabel: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkTheme.palette.background.paper,
    justifySelf: "stretch",
    alignSelf: "stretch",
    borderRadius: borderRadius,

    fontWeight: "bold",
    fontSize: 15,
    color: darkTheme.palette.colors.accent,
    "& svg": {
      fill: darkTheme.palette.colors.accent,
      height: "20px",
      width: "20px",
      marginRight: 1,
    },
  },
  resetButton: {
    backgroundColor: darkTheme.palette.colors.accent,
    color: darkTheme.palette.background.default,
    borderRadius: "7px",
    justifySelf: "end",
  },
};

interface Props {
  resetBoard: () => void;
  activePlayer: Player;
}

const Header = ({ resetBoard, activePlayer }: Props) => {
  const playerIcon = activePlayer === "x" ? <Cross /> : <Circle />;
  return (
    <Box sx={styles.container}>
      <Box sx={styles.iconsContainer}>
        <Cross />
        <Circle />
      </Box>
      <Typography sx={styles.playerLabel}>{playerIcon} TURN</Typography>
      <IconButton onClick={resetBoard} sx={styles.resetButton}>
        <ReplayIcon />
      </IconButton>
    </Box>
  );
};

export default Header;
