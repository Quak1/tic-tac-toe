import { useContext } from "react";
import { Typography } from "@mui/material";

import TempLoginForm from "./TempLogin";
import ChallengePlayerForm from "./ChallengePlayer";
import AuthContext from "../../context/AuthProvider";

const Header = () => {
  const authContext = useContext(AuthContext);

  return authContext.user ? (
    <>
      <Typography>{`${authContext.user.username}#${authContext.user.id}`}</Typography>
      <ChallengePlayerForm />
    </>
  ) : (
    <TempLoginForm />
  );
};

export default Header;
