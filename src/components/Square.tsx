import { Player } from "../utils/types";

interface Props {
  index: number;
  player: Player;
  gameState: Player[];
  clickSquare: (index: number) => void;
}

const Square = ({ index, gameState, clickSquare }: Props) => {
  return (
    <div className="square" onClick={() => clickSquare(index)}>
      {gameState[index]}
    </div>
  );
};

export default Square;
