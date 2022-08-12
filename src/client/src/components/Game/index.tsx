import { useState } from "react";
import { Box } from "@mui/material";

import {
  Board as BoardType,
  Player,
  GameFinishedType,
} from "../../utils/types";
import { checkWinner, isFullBoard } from "../../utils/game";
import Board from "../Board";
import Header from "./Header";
import Footer from "./Footer";
import GameEndDialog from "./GameEndDialog";

const styles = {
  maxWidth: "520px",
  width: "100%",
  padding: "0 10px",
};

const Game = () => {
  const [gameState, setGameState] = useState<BoardType>(new Array(9).fill(""));
  const [activePlayer, setActivePlayer] = useState<Player>("x");
  const [gameFinished, setGameFinished] = useState<GameFinishedType>();
  const [score, setScore] = useState({ x: 0, tie: 0, o: 0 });
  const [winner, setWinner] = useState<string>();

  const [openDialog, setOpenDialog] = useState(false);

  const resetBoard = () => {
    setGameState(new Array(9).fill(""));
    setGameFinished(undefined);
    setActivePlayer("x");
  };

  const clickSquare = (index: number) => {
    const newGameState = [...gameState];
    newGameState[index] = activePlayer;
    setGameState(newGameState);

    let winner: Player | "tie" | undefined;
    const winnerSlots = checkWinner(newGameState);
    if (winnerSlots) {
      winner = activePlayer;
    } else if (isFullBoard(newGameState)) {
      winner = "tie";
    } else {
      setActivePlayer(activePlayer === "x" ? "o" : "x");
      return;
    }

    const newScore = { ...score };
    newScore[winner] += 1;
    setScore(newScore);
    setWinner(winner);

    setGameFinished(winnerSlots);
    setOpenDialog(true);

    return;
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={styles}>
      <Header resetBoard={resetBoard} activePlayer={activePlayer} />
      <Board
        gameState={gameState}
        gameFinished={gameFinished}
        clickSquare={clickSquare}
      />
      <Footer score={score} />
      <GameEndDialog
        open={openDialog}
        onClose={handleCloseDialog}
        winner={winner}
        isWinner={true}
        resetBoard={resetBoard}
      />
    </Box>
  );
};

export default Game;
