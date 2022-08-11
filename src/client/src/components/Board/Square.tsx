import { Box } from "@mui/material";

import Circle from "../Icons/Circle";
import Cross from "../Icons/Cross";
import { Board, GameFinishedType } from "../../utils/types";

import { borderRadius, darkTheme } from "../../utils/theme";

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: borderRadius,
  backgroundColor: "background.paper",
  boxShadow: "0 5px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    filter: "brightness(130%)",
    cursor: "pointer",
  },
  "& svg": {
    height: "65%",
    width: "65%",
  },
};

const getInvertedStyle = (gameState: Board, index: number) => {
  return {
    backgroundColor:
      gameState[index] === "x"
        ? darkTheme.palette.colors.cross
        : darkTheme.palette.colors.circle,
    "& svg": {
      fill: darkTheme.palette.background.default,
      height: "65%",
      width: "65%",
    },
  };
};

interface Props {
  index: number;
  gameState: Board;
  clickSquare: (index: number) => void;
  gameFinished: GameFinishedType;
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

  const winnerStyles =
    gameFinished && gameFinished.includes(index)
      ? getInvertedStyle(gameState, index)
      : undefined;

  return (
    <Box onClick={onClick} sx={{ ...styles, ...winnerStyles }}>
      {content}
    </Box>
  );
};

export default Square;
