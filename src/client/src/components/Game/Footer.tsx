import ScoreDisplay from "./ScoreDisplay";

interface Props {
  score: {
    x: number;
    o: number;
    tie: number;
  };
}

const Footer = ({ score }: Props) => {
  return (
    <div className="game-footer">
      <ScoreDisplay player="x" score={score.x} />
      <ScoreDisplay player="tie" score={score.tie} />
      <ScoreDisplay player="o" score={score.o} />
    </div>
  );
};

export default Footer;
