import { Box } from "@mui/material";

import BoardButton from "../BoardButton";
import FullWithDialog from "./FullWidthDialog";
import DialogMainMessage from "./DialogMainMessage";

const styles = {
  buttons: {
    display: "flex",
    gap: 1,
  },
};

interface Props {
  open: boolean;
  onClose: (event?: object, reason?: string) => void;
  accept: () => void;
  deny: () => void;
}

const AnswerChallengeDialog = ({ open, accept, deny, onClose }: Props) => {
  return (
    <FullWithDialog open={open} onClose={onClose}>
      <DialogMainMessage>CHALLENGE RECEIVED!</DialogMainMessage>

      <Box sx={styles.buttons}>
        <BoardButton variant="contained" onClick={accept}>
          ACCEPT
        </BoardButton>
        <BoardButton onClick={deny}>DECLINE</BoardButton>
      </Box>
    </FullWithDialog>
  );
};

export default AnswerChallengeDialog;
