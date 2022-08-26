import { useState, useContext, useEffect } from "react";

import {
  Board as BoardType,
  Player,
  GameFinishedType,
} from "../../utils/types";
import Board from "../Board";
import GameEndDialog from "../Dialogs/GameEndDialog";
import GameContext from "../../context/GameStatusProvider";
import AuthContext from "context/AuthProvider";
import { GameState } from "@backend/types";
import { parseGameState, checkWinner, getUserPiece } from "../../utils/game";
import axios from "../../api/axios";

const Game = () => {
  const gameContext = useContext(GameContext);
  const authContext = useContext(AuthContext);
  const [boardState, setBoardState] = useState<BoardType>(
    new Array(9).fill("")
  );
  const [userPiece, setUserPiece] = useState<Player>();
  const [activePlayer, setActivePlayer] = useState<Player>("x");
  const [winningPositions, setWinningPositions] = useState<GameFinishedType>();
  const [score, setScore] = useState({ x: 0, tie: 0, o: 0 });
  const [winner, setWinner] = useState<string>();
  const [tilesDisabled, setTilesDisabled] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [isUserWinner, setIsUserWinner] = useState(false);

  const gameStatus = gameContext.gameStatus;
  useEffect(() => {
    if (!gameStatus) return;

    const parsedGame = parseGameState(gameStatus);
    setBoardState(parsedGame);

    const activePlayerTag = gameStatus.activePlayer;
    setActivePlayer(gameStatus[`${activePlayerTag}Piece`]);
    setUserPiece(getUserPiece(authContext.user!, gameStatus));

    if (authContext.user?.id === gameStatus[activePlayerTag]) {
      setTilesDisabled(false);
    } else {
      waitForMove(gameStatus.id);
    }

    if (gameStatus.isOver) {
      const winner = checkWinner(parsedGame);
      if (winner) {
        setWinningPositions(winner);

        const winnerPiece = parsedGame[winner[0]];
        if (winnerPiece === "") return;
        if (winnerPiece === userPiece) setIsUserWinner(true);
        else setIsUserWinner(false);
        setWinner(winnerPiece);

        setScore({
          ...score,
          [winnerPiece]: score[winnerPiece] + 1,
        });
      } else {
        setWinningPositions(undefined);
        setWinner("tie");
        setScore({
          ...score,
          tie: score["tie"] + 1,
        });
      }
      setOpenDialog(true);
    }
  }, [gameStatus]);

  const resetBoard = () => {
    // TODO handle board reset
    // rematch? always at end of the game?
    console.log("reset Board");
  };

  const onSquareClick = (index: number) => {
    if (!gameStatus) return;
    const newGameStatus = { ...gameStatus };
    newGameStatus[index] = activePlayer;
    sendMove(index);
    console.log("square click");
  };

  const sendMove = async (position: number) => {
    setTilesDisabled(true);
    const gameId = gameStatus?.id;
    const res = await axios.post<GameState>(`/game/${gameId}`, { position });
    gameContext.setGameStatus(res.data);
  };

  const waitForMove = async (gameId: number) => {
    const res = await axios.get<GameState>(`/game/${gameId}/wait`);
    gameContext.setGameStatus(res.data);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Board
        gameState={boardState}
        winningPositions={winningPositions}
        onSquareClick={onSquareClick}
        resetBoard={resetBoard}
        activePlayer={activePlayer}
        userPiece={userPiece}
        score={score}
        tilesDisabled={tilesDisabled}
      />
      <GameEndDialog
        open={openDialog}
        onClose={handleCloseDialog}
        winner={winner}
        isWinner={isUserWinner}
        resetBoard={resetBoard}
      />
    </>
  );
};

export default Game;
