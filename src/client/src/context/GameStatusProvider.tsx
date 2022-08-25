import { createContext, useState } from "react";

import { GameState } from "@backend/types";

interface GameStatusContextInterface {
  gameStatus?: GameState;
  setGameStatus: (gameStatus: GameState) => void;
}

const GameStatusContext = createContext<GameStatusContextInterface>(
  {} as GameStatusContextInterface
);

export const GameStatusProvider = ({ children }: { children: JSX.Element }) => {
  const [gameStatus, setGameStatus] = useState<GameState | undefined>();

  return (
    <GameStatusContext.Provider value={{ gameStatus, setGameStatus }}>
      {children}
    </GameStatusContext.Provider>
  );
};

export default GameStatusContext;
