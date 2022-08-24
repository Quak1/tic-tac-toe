import { Dialog, Box } from "@mui/material";

const styles = {
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
};

export interface DialogProps {
  open: boolean;
  onClose: (event?: object, reason?: string) => void;
  children: React.ReactNode;
}

const FullWithDialog = ({ open, onClose, children }: DialogProps) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: styles.paper,
        square: true,
        variant: "outlined",
        elevation: 0,
      }}
    >
      <Box sx={styles.container}>{children}</Box>
    </Dialog>
  );
};

export default FullWithDialog;
