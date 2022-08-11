import { Box } from "@mui/material";

import Circle from "../Icons/Circle";
import Cross from "../Icons/Cross";
import { Board } from "../../utils/types";

import { borderRadius } from "../../utils/theme";

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: borderRadius,
  backgroundColor: "background.paper",
  boxShadow: "0 5px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    filter: "brightness(90%)",
    cursor: "pointer",
  },
  "& svg": {
    height: "65%",
    width: "65%",
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

  const handleClick = () => {
    clickSquare(index);
  };

  let content;
  if (gameState[index] === "x") {
    content = <Cross />;
  } else if (gameState[index] === "o") {
    content = <Circle />;
  }
  const onClick = enabled && !gameFinished ? handleClick : undefined;

  return (
    <Box onClick={onClick} sx={styles}>
      {content}
    </Box>
  );
};

export default Square;
