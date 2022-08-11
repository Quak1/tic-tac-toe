import { Player } from "../../utils/types";

interface Props {
  score: number;
  player: Player | "tie";
}

const ScoreDisplay = ({ score, player }: Props) => {
  const label = player === "tie" ? "ties" : "player " + player;

  return (
    <div className={`score-display ${player}`}>
      <div>{label}</div>
      <div>{score}</div>
    </div>
  );
};

export default ScoreDisplay;
