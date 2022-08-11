import { Box } from "@mui/material";

import Square from "./Square";
import { Board as BoardType, GameFinishedType} from "../../utils/types";
import { gameGrid } from "../../utils/theme";

const styles = {
  ...gameGrid,
  gridTemplateRows: "repeat(3, minmax(10px, 1fr))",
  maxWidth: "500px",
  aspectRatio: "1 / 1",
  margin: gameGrid.gap + " 0",
};

interface Props {
  gameState: BoardType;
  gameFinished: GameFinishedType;
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
