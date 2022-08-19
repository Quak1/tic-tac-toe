export interface UserDetails {
  username: string;
  id: number;
}

export interface LoginCredentials {
  username: string;
}

export interface LoginDetails {
  username: string;
  token: string;
  id: number;
}

export interface BaseParams<IDType = string> {
  id: IDType;
}

export type Piece = "x" | "o";
export type Board = Array<Piece | "">;
export interface GameState {
  id: number;
  playerA: number;
  playerB: number;
  playerAPiece: Piece;
  playerBPiece: Piece;
  activePlayer: "playerA" | "playerB";
  move: number;
  isOver: boolean;
  [key: number]: Piece;
}
