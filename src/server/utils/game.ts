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

const parseGameState = (game: Record<string, string>): Board => {
  const board: Board = [];
  for (let i = 0; i < 9; i++) {
    const piece = game[i];
    if (piece === "x" || piece === "o") board.push(piece);
    else board.push("");
  }
  return board;
};

export const checkWinner = (boardState: Board) => {
  const winner = winningPositions.find((entry) => {
    const first = boardState[entry[0]];
    return (
      first && first === boardState[entry[1]] && first === boardState[entry[2]]
    );
  });
  return winner;
};

export const isFullBoard = (boardState: Board) => {
  const index = boardState.findIndex((entry) => entry === "");
  return index === -1;
};

export const isGameFinished = (game: Record<string, string>) => {
  const boardState = parseGameState(game);
  const winner = checkWinner(boardState);

  if (winner) return boardState[winner[0]];
  return isFullBoard(boardState) ? "tie" : false;
};
