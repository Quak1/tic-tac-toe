export type Player = "x" | "o";
export type Board = Array<Player | "">;
export type GameFinishedType = number[] | undefined;

export interface TotalScore {
  x: number;
  o: number;
  tie: number;
}
