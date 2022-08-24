import { Box } from "@mui/material";

const defaultStyles = {
  display: "flex",
  alignItems: "center",
  fontSize: 30,
  fontWeight: "bold",
  "& svg": {
    height: 45,
    marginRight: 1,
  },
};

interface Props {
  children: React.ReactNode;
  styles?: Record<string, any>;
}

const DialogMainMessage = ({ children, styles }: Props) => {
  return <Box sx={{ ...defaultStyles, ...styles }}>{children}</Box>;
};

export default DialogMainMessage;
