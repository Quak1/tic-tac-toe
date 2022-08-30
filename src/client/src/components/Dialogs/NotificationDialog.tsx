import { Typography } from "@mui/material";
import FullWidthDialog from "./FullWidthDialog";
import DialogMainMessage from "./DialogMainMessage";

import BoardButton from "../BoardButton";

interface NotificationDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message?: string;
}

const NotificationDialog = ({
  open,
  onClose,
  title,
  message,
}: NotificationDialogProps) => {
  return (
    <FullWidthDialog open={open} onClose={onClose}>
      <DialogMainMessage>{title}</DialogMainMessage>
      {message && <Typography>{message}</Typography>}
      <BoardButton onClick={onClose}>CLOSE</BoardButton>
    </FullWidthDialog>
  );
};

export default NotificationDialog;
