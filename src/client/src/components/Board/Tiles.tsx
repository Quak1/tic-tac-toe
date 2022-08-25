import { Box } from "@mui/material";

import Square from "./Square";

import { Board as BoardType, GameFinishedType } from "../../utils/types";
import { gameGrid } from "../../utils/theme";

const styles = {
  ...gameGrid,
  gridTemplateRows: "repeat(3, minmax(10px, 1fr))",
  aspectRatio: "1 / 1",
  marginTop: gameGrid.gap,
  marginBottom: gameGrid.gap,
};

interface Props {
  gameState: BoardType;
  winningPositions: GameFinishedType;
  onSquareClick: (i: number) => void;
}

const Tiles = ({ gameState, onSquareClick, winningPositions }: Props) => {
  let squares = [];
  for (let i = 0; i < 9; i++) {
    squares.push(
      <Square
        key={i}
        index={i}
        gameState={gameState}
        clickSquare={onSquareClick}
        gameFinished={winningPositions}
      />
    );
  }

  return <Box sx={styles}>{squares}</Box>;
};

export default Tiles;
