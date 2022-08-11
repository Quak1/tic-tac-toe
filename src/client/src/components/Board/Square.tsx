import { Box } from "@mui/material";

import { ReactComponent as Cross } from "../../icons/cross.svg";
import { ReactComponent as Circle } from "../../icons/circle.svg";
import { Board } from "../../utils/types";

import { darkTheme } from "../../utils/theme";

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "15px",
  backgroundColor: "background.paper",
  "&:hover": {
    filter: "brightness(90%)",
    cursor: "pointer",
  },
  "& svg": {
    height: "90%",
    width: "90%",
  },
};

interface Props {
  index: number;
  gameState: Board;
  clickSquare: (index: number) => void;
  gameFinished: boolean;
}

const Square = ({ index, gameState, clickSquare, gameFinished }: Props) => {
  const enabled: boolean = !gameState[index];
  console.log(darkTheme);

  const handleClick = () => {
    clickSquare(index);
  };

  let content;
  if (gameState[index] === "x") {
    content = <Cross fill={darkTheme.palette.colors.cross} />;
  } else if (gameState[index] === "o") {
    content = <Circle fill={darkTheme.palette.colors.circle} />;
  }
  const onClick = enabled && !gameFinished ? handleClick : undefined;

  return (
    <Box onClick={onClick} sx={styles}>
      {content}
    </Box>
  );
};

export default Square;
