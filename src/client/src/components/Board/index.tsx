import { Box } from "@mui/material";

import Header from "./Header";
import Tiles from "./Tiles";
import Footer from "./Footer";

import {
  Board as BoardType,
  GameFinishedType,
  Player,
  TotalScore,
} from "../../utils/types";

const styles = {
  maxWidth: "520px",
  width: "100%",
  padding: "0 10px",
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
  return (
    <Box sx={styles}>
      <Header resetBoard={resetBoard} activePlayer={activePlayer} />
      <Tiles
        gameState={gameState}
        winningPositions={winningPositions}
        onSquareClick={onSquareClick}
      />
      <Footer score={score} />
    </Box>
  );
};

export default Board;
