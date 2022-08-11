import Square from "./Square";
import { Board as BoardType } from "../../utils/types";
import "./Board.css";

interface Props {
  gameState: BoardType;
  gameFinished: boolean;
  clickSquare: (i: number) => void;
}

const Board = ({ gameState, gameFinished, clickSquare }: Props) => {
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

  return <div className="board">{squares}</div>;
};

export default Board;
