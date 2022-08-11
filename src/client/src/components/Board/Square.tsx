import { Box } from "@mui/material";

import Cross from "../../icons/cross.svg";
import Circle from "../../icons/circle.svg";
import { Board } from "../../utils/types";

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
  "& img": {
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

  const handleClick = () => {
    clickSquare(index);
  };

  const imgSrc = gameState[index] === "x" ? Cross : Circle;
  const imgAlt = gameState[index] === "x" ? "Cross" : "Circle";
  const content = enabled ? null : <img src={imgSrc} alt={imgAlt} />;
  const onClick = enabled && !gameFinished ? handleClick : undefined;

  return (
    <Box onClick={onClick} sx={styles}>
      {content}
    </Box>
  );
};

export default Square;
