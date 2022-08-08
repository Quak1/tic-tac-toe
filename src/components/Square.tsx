import { useState } from "react";
import { Board } from "../utils/types";

interface Props {
  index: number;
  gameState: Board;
  clickSquare: (index: number) => void;
}

const Square = ({ index, gameState, clickSquare }: Props) => {
  const [enabled, setEnabled] = useState(true);

  const handleClick = () => {
    setEnabled(false);
    clickSquare(index);
  };

  if (enabled) {
    return (
      <div className="square" onClick={handleClick}>
        {gameState[index]}
      </div>
    );
  } else {
    return <div className="square">{gameState[index]}</div>;
  }
};

export default Square;
