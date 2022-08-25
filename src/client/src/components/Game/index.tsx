import { useState } from "react";

import {
  Board as BoardType,
  Player,
  GameFinishedType,
} from "../../utils/types";
import { checkWinner, isFullBoard } from "../../utils/game";
import Board from "../Board";
import GameEndDialog from "../Dialogs/GameEndDialog";

const Game = () => {
  const [gameState, setGameState] = useState<BoardType>(new Array(9).fill(""));
  const [activePlayer, setActivePlayer] = useState<Player>("x");
  const [winningPositions, setWinningPositions] = useState<GameFinishedType>();
  const [score, setScore] = useState({ x: 0, tie: 0, o: 0 });
  const [winner, setWinner] = useState<string>();

  const [openDialog, setOpenDialog] = useState(false);

  const resetBoard = () => {
    setGameState(new Array(9).fill(""));
    setWinningPositions(undefined);
    setActivePlayer("x");
  };

  const onSquareClick = (index: number) => {
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

    setWinningPositions(winnerSlots);
    setOpenDialog(true);

    return;
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Board
        gameState={gameState}
        winningPositions={winningPositions}
        onSquareClick={onSquareClick}
        resetBoard={resetBoard}
        activePlayer={activePlayer}
        score={score}
        tilesDisabled={false}
      />
      <GameEndDialog
        open={openDialog}
        onClose={handleCloseDialog}
        winner={winner}
        isWinner={true}
        resetBoard={resetBoard}
      />
    </>
  );
};

export default Game;
