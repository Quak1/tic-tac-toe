import { useState } from "react";

import Square from "./Square";
import { Player, Board as BoardType } from "../../utils/types";
import { checkWinner } from "../../utils/game";
import "./Board.css";

const Board = () => {
  const [gameState, setGameState] = useState<BoardType>(new Array(9).fill(""));
  const [player, setPlayer] = useState<Player>("x");
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  const clickSquare = (index: number) => {
    const newGameState = [...gameState];
    newGameState[index] = player;
    setGameState(newGameState);

    if (checkWinner(newGameState)) {
      console.log("Winner: ", player);
      setGameFinished(true);
    } else setPlayer(player === "x" ? "o" : "x");
  };

  const resetBoard = () => {
    setGameState(new Array(9).fill(""));
    setGameFinished(false);
    setPlayer("x");
  };

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

  return (
    <div className="board">
      {squares}
      <button onClick={resetBoard}>Reset game</button>
    </div>
  );
};

export default Board;
