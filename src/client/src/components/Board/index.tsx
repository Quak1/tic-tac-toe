import { Box } from "@mui/material";

import Square from "./Square";
import { Board as BoardType } from "../../utils/types";
import { gameGrid } from "../../utils/theme";

const styles = {
  ...gameGrid,
  maxWidth: "500px",
  aspectRatio: " 1 / 1",
};

interface Props {
  gameState: BoardType;
  gameFinished: boolean;
  clickSquare: (i: number) => void;
}

const Board = ({ gameState, gameFinished, clickSquare }: Props) => {
  let squares = [];
  for (let i = 0; i < 9; i++) {
    squares.push(
      <Square
        key={i}
        index={i}
        gameState={gameState}
        clickSquare={clickSquare}
        gameFinished={gameFinished}
      />
    );
  }

  return <Box sx={styles}>{squares}</Box>;
};

export default Board;
