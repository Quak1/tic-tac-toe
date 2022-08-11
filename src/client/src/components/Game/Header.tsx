import { Player } from "../../utils/types";

interface Props {
  resetBoard: () => void;
  activePlayer: Player;
}

const Header = ({ resetBoard, activePlayer }: Props) => {
  return (
    <div>
      {`${activePlayer}'s turn `}
      <button onClick={resetBoard}>reset game</button>
    </div>
  );
};

export default Header;
