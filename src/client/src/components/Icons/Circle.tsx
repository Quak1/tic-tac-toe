import { ReactComponent as CircleIcon } from "../../icons/circle.svg";
import { darkTheme } from "../../utils/theme";

const Circle = ({ gray }: { gray?: boolean }) => {
  return (
    <CircleIcon
      fill={
        gray ? darkTheme.palette.colors.accent : darkTheme.palette.colors.circle
      }
    />
  );
};

export default Circle;
