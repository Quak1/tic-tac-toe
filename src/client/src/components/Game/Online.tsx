import { useState, useContext } from "react";

import {
  Board as BoardType,
  Player,
  GameFinishedType,
} from "../../utils/types";
import { checkWinner, isFullBoard } from "../../utils/game";
import Board from "../Board";
import GameEndDialog from "../Dialogs/GameEndDialog";
import GameContext from "../../context/GameStatusProvider";

const Game = () => {
  const [gameState, setGameState] = useState<BoardType>(new Array(9).fill(""));
  const [activePlayer, setActivePlayer] = useState<Player>("x");
  const [winningPositions, setWinningPositions] = useState<GameFinishedType>();
  const [score, setScore] = useState({ x: 0, tie: 0, o: 0 });
  const [winner, setWinner] = useState<string>();
  const [tilesDisabled, setTilesDisabled] = useState(true);
  const gameContext = useContext(GameContext);

  if (gameContext.gameStatus)
    console.log("gameContext", gameContext.gameStatus);
  const [openDialog, setOpenDialog] = useState(false);

  const resetBoard = () => {
    // TODO handle board reset
    // rematch? always at end of the game?
    console.log("reset Board");
  };

  const onSquareClick = (index: number) => {
    // update local board state
    // send requeset to server
    // update local state with new movement
    console.log("square click");
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
        tilesDisabled={tilesDisabled}
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
