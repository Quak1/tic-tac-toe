import { Dialog, Box, Typography } from "@mui/material";

import Cross from "../Icons/Cross";
import Circle from "../Icons/Circle";
import BoardButton from "../BoardButton";
import { darkTheme } from "../../utils/theme";

const styles = {
  dialog: {},
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  paper: {
    maxWidth: "100vw",
    width: "100%",
    margin: 0,
    padding: "40px 10px",
    border: "unset",
  },
  winner: {
    color: darkTheme.palette.colors.accent,
    fontSize: 13,
    fontWeight: "bold",
  },
  message: {
    display: "flex",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold",
    "& svg": {
      height: 45,
      marginRight: 1,
    },
  },
  buttons: {
    display: "flex",
    gap: 1,
  },
};

interface Props {
  open: boolean;
  onClose: () => void;
  winner?: string;
  isWinner: boolean;
  resetBoard: () => void;
}

const GameEndDialog = ({
  onClose,
  open,
  winner,
  isWinner,
  resetBoard,
}: Props) => {
  const nextButtonColor =
    winner === "x"
      ? darkTheme.palette.colors.circle
      : darkTheme.palette.colors.cross;

  const messageColor =
    winner === "x"
      ? darkTheme.palette.colors.cross
      : darkTheme.palette.colors.circle;

  const isTie = winner === "tie";

  const handleNextRound = () => {
    resetBoard();
    onClose();
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={styles.dialog}
      PaperProps={{
        sx: styles.paper,
        square: true,
        variant: "outlined",
        elevation: 0,
      }}
    >
      <Box sx={styles.container}>
        {!isTie && (
          <Typography sx={styles.winner}>
            {isWinner ? "YOU WON!" : "YOU LOSE :("}
          </Typography>
        )}

        <Box sx={{ ...styles.message, color: messageColor }}>
          {!isTie ? (
            <>
              {winner === "x" ? <Cross /> : <Circle />}
              TAKES THE ROUND
            </>
          ) : (
            <>IT'S A TIE!</>
          )}
        </Box>

        <Box sx={styles.buttons}>
          <BoardButton onClick={onClose}>QUIT</BoardButton>
          <BoardButton onClick={handleNextRound} color={nextButtonColor}>
            NEXT ROUND
          </BoardButton>
        </Box>
      </Box>
    </Dialog>
  );
};

export default GameEndDialog;
