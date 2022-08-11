import { useState } from "react";

import { Board as BoardType, Player } from "../../utils/types";
import { checkWinner, isFullBoard } from "../../utils/game";
import Board from "../Board";
import Header from "./Header";
import Footer from "./Footer";
import "./game.css";

const Game = () => {
  const [gameState, setGameState] = useState<BoardType>(new Array(9).fill(""));
  const [activePlayer, setActivePlayer] = useState<Player>("x");
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [score, setScore] = useState({ x: 0, tie: 0, o: 0 });

  const resetBoard = () => {
    setGameState(new Array(9).fill(""));
    setGameFinished(false);
    setActivePlayer("x");
  };

  const clickSquare = (index: number) => {
    const newGameState = [...gameState];
    newGameState[index] = activePlayer;
    setGameState(newGameState);

    let winner: Player | "tie" | undefined;
    if (checkWinner(newGameState)) {
      winner = activePlayer;
    }
    if (isFullBoard(newGameState)) {
      winner = "tie";
    }
    if (!winner) {
      setActivePlayer(activePlayer === "x" ? "o" : "x");
      return;
    }

    const newScore = { ...score };
    newScore[winner] += 1;
    setScore(newScore);

    setGameFinished(true);

    alert("Winner: " + winner);
    return;
  };

  return (
    <div>
      <Header resetBoard={resetBoard} activePlayer={activePlayer} />
      <Board
        gameState={gameState}
        gameFinished={gameFinished}
        clickSquare={clickSquare}
      />
      <Footer score={score} />
    </div>
  );
};

export default Game;
