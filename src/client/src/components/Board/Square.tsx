import Cross from "../../icons/cross.svg";
import Circle from "../../icons/circle.svg";
import { Board } from "../../utils/types";

interface Props {
  index: number;
  gameState: Board;
  clickSquare: (index: number) => void;
  gameFinished: boolean;
}

const Square = ({ index, gameState, clickSquare, gameFinished }: Props) => {
  const enabled: boolean = !gameState[index];

  const handleClick = () => {
    clickSquare(index);
  };

  const imgSrc = gameState[index] === "x" ? Cross : Circle;
  const imgAlt = gameState[index] === "x" ? "Cross" : "Circle";
  const content = enabled ? null : <img src={imgSrc} alt={imgAlt} />;
  const onClick = enabled && !gameFinished ? handleClick : undefined;

  return (
    <div className="square" onClick={onClick}>
      {content}
    </div>
  );
};

export default Square;
