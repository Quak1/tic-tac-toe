import { Box, Typography } from "@mui/material";

import Cross from "../Icons/Cross";
import Circle from "../Icons/Circle";
import BoardButton from "../BoardButton";
import { darkTheme } from "../../utils/theme";
import FullWithDialog from "./FullWidthDialog";
import DialogMainMessage from "./DialogMainMessage";

const styles = {
  winner: {
    color: darkTheme.palette.colors.accent,
    fontSize: 13,
    fontWeight: "bold",
  },
  buttons: {
    display: "flex",
    gap: 1,
  },
};

interface Props {
  open: boolean;
  onClose: (event?: object, reason?: string) => void;
  winner?: string;
  isWinner: boolean;
  resetBoard: () => void;
}

const GameEndDialog = ({
  open,
  onClose,
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
    <FullWithDialog open={open} onClose={onClose}>
      {!isTie && (
        <Typography sx={styles.winner}>
          {isWinner ? "YOU WON!" : "YOU LOSE :("}
        </Typography>
      )}

      <DialogMainMessage styles={{ color: messageColor }}>
        {isTie ? (
          "IT'S A TIE!"
        ) : (
          <>
            {winner === "x" ? <Cross /> : <Circle />}
            TAKES THE ROUND
          </>
        )}
      </DialogMainMessage>

      <Box sx={styles.buttons}>
        <BoardButton onClick={onClose}>QUIT</BoardButton>
        <BoardButton onClick={handleNextRound} color={nextButtonColor}>
          NEXT ROUND
        </BoardButton>
      </Box>
    </FullWithDialog>
  );
};

export default GameEndDialog;
