import { Board } from "./types";

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWinner = (boardState: Board) => {
  let winner = false;
  winningPositions.forEach((entry) => {
    const first = boardState[entry[0]];
    if (
      first &&
      first === boardState[entry[1]] &&
      first === boardState[entry[2]]
    ) {
      winner = true;
    }
  });
  return winner;
};

export const isFullBoard = (boardState: Board) => {
  const index = boardState.findIndex((entry) => entry === "");
  return index === -1 ? true : false;
};
