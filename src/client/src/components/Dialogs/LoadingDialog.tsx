import { Typography, CircularProgress } from "@mui/material";
import FullWidthDialog from "./FullWidthDialog";
import DialogMainMessage from "./DialogMainMessage";

interface LoadingDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message?: string;
}

const LoadingDialog = ({
  open,
  onClose,
  title,
  message,
}: LoadingDialogProps) => {
  const handleClose = (event?: object, reason?: string) => {
    if (reason === "backdropClick") return;
    onClose();
  };

  return (
    <FullWidthDialog open={open} onClose={handleClose}>
      <DialogMainMessage>{title}</DialogMainMessage>
      {message && <Typography>{message}</Typography>}
      <CircularProgress />
    </FullWidthDialog>
  );
};

export default LoadingDialog;
