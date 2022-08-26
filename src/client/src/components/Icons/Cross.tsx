import { ReactComponent as CrossIcon } from "../../icons/cross.svg";
import { darkTheme } from "../../utils/theme";

const Cross = ({ gray }: { gray?: boolean }) => {
  return (
    <CrossIcon
      fill={
        gray ? darkTheme.palette.colors.accent : darkTheme.palette.colors.cross
      }
    />
  );
};

export default Cross;
