import { useState } from "react";

import Square from "./Square";
import { Player } from "../utils/types";
import "./Board.css";

const Board = () => {
  const [gameState, setGameState] = useState<Player[]>(new Array(9).fill(""));
  const [player, setPlayer] = useState<Player>("x");

  const clickSquare = (index: number) => {
    const newGameState = [...gameState];
    newGameState[index] = player;
    setGameState(newGameState);
    setPlayer(player === "x" ? "o" : "x");
  };

  let squares = [];
  for (let i = 0; i < 9; i++) {
    squares.push(
      <Square
        key={i}
        index={i}
        player={player}
        gameState={gameState}
        clickSquare={clickSquare}
      />
    );
  }

  return <div className="board">{squares}</div>;
};

export default Board;
