import { Button, ButtonProps } from "@mui/material";
import { darkTheme } from "../utils/theme";

interface Props extends Omit<ButtonProps, "color"> {
  color?: string;
}

const BoardButton = ({ color, ...props }: Props) => {
  const styles = {
    backgroundColor: color || darkTheme.palette.colors.accent,
    color: darkTheme.palette.background.default,
    borderRadius: "7px",
    justifySelf: "end",
    fontWeight: "bold",
    boxShadow: "0 5px ",
    marginBotton: 20,

    "&:hover": {
      backgroundColor: color || darkTheme.palette.colors.accent,
      filter: "brightness(90%)",
    },
  };

  return (
    <Button {...props} sx={styles}>
      {props.children}
    </Button>
  );
};

export default BoardButton;
