import { useContext } from "react";
import { Typography } from "@mui/material";

import TempLoginForm from "./TempLogin";
import ChallengePlayer from "./ChallengePlayer";
import AuthContext from "../../context/AuthProvider";
import WaitGameButton from "./WaitGameButton";

const Header = () => {
  const authContext = useContext(AuthContext);

  return authContext.user ? (
    <>
      <Typography>{`${authContext.user.username}#${authContext.user.id}`}</Typography>
      <ChallengePlayer />
      <WaitGameButton />
    </>
  ) : (
    <TempLoginForm />
  );
};

export default Header;
