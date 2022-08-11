import { Box, Button } from "@mui/material";

import Circle from "../Icons/Circle";
import Cross from "../Icons/Cross";
import { Player } from "../../utils/types";

interface Props {
  resetBoard: () => void;
  activePlayer: Player;
}

const Header = ({ resetBoard, activePlayer }: Props) => {
  return (
    <Box>
      <Box>
        <Cross />
        <Circle />
      </Box>
      {`${activePlayer}'s turn `}
      <Button onClick={resetBoard}>reset game</Button>
    </Box>
  );
};

export default Header;
