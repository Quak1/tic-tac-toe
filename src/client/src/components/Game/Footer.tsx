interface Props {
  score: {
    x: number;
    o: number;
    tie: number;
  };
}

const Footer = ({ score }: Props) => {
  return <div>{`${score.x} - ${score.tie} - ${score.o}`}</div>;
};

export default Footer;
