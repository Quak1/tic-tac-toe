import { Box } from "@mui/material";

import Square from "./Square";
import Header from "./Header";
import Footer from "./Footer";

import {
  Board as BoardType,
  GameFinishedType,
  Player,
  TotalScore,
} from "../../utils/types";
import { gameGrid } from "../../utils/theme";

const styles = {
  board: {
    ...gameGrid,
    gridTemplateRows: "repeat(3, minmax(10px, 1fr))",
    aspectRatio: "1 / 1",
    marginTop: gameGrid.gap,
    marginBottom: gameGrid.gap,
  },
  gameContainer: {
    maxWidth: "520px",
    width: "100%",
    padding: "0 10px",
  },
};

interface Props {
  gameState: BoardType;
  winningPositions: GameFinishedType;
  onSquareClick: (i: number) => void;
  resetBoard: () => void;
  activePlayer: Player;
  score: TotalScore;
}

const Board = ({
  gameState,
  winningPositions,
  onSquareClick,
  resetBoard,
  activePlayer,
  score,
}: Props) => {
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

  return (
    <Box sx={styles.gameContainer}>
      <Header resetBoard={resetBoard} activePlayer={activePlayer} />
      <Box sx={styles.board}>{squares}</Box>
      <Footer score={score} />
    </Box>
  );
};

export default Board;
