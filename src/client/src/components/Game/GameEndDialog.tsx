import { Dialog, Box, Button, Typography } from "@mui/material";

import Cross from "../Icons/Cross";
import Circle from "../Icons/Circle";
import { Player } from "../../utils/types";

const styles = {
  dialog: {
    // width: "100vw",
  },
  paper: {
    maxWidth: "100vw",
    width: "100%",
    margin: 0,
    border: "unset",
  },
};

interface Props {
  open: boolean;
  onClose: () => void;
  activePlayer: Player;
  winner: boolean;
}

const GameEndDialog = ({ onClose, open, activePlayer, winner }: Props) => {
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
      <Typography>{winner ? "YOU WON!" : "YOU LOSE :("}</Typography>
      <Box sx={{ "& svg": { height: 20 } }}>
        {activePlayer === "x" ? <Cross /> : <Circle />}
        TAKES THE ROUND
      </Box>
      <Box>
        <Button onClick={onClose}>QUIT</Button>
        <Button onClick={() => console.log("next round")}>NEXT ROUND</Button>
      </Box>
    </Dialog>
  );
};

export default GameEndDialog;
