import { useContext } from "react";
import { Typography } from "@mui/material";

import axios, { addAuthToken } from "../api/axios";
import AuthContext from "../context/AuthProvider";
import ToggleableSingleInputForm from "./Forms/ToggleableSingleInputForm";
import { FormData } from "./Forms/SingleInputForm";

interface LoginResponse {
  username: string;
  token: string;
  id: number;
}

const TempLogin = () => {
  const authContext = useContext(AuthContext);

  const loginUser = async (data: FormData) => {
    const res = await axios.post<LoginResponse>("/login", {
      username: data.field,
    });

    addAuthToken(res.data.token);
    authContext.setUser(res.data);
  };

  return authContext.user ? (
    <Typography>{`${authContext.user.username}#${authContext.user.id}`}</Typography>
  ) : (
    <ToggleableSingleInputForm
      onSubmit={loginUser}
      labels={{ label: "Username", button: "Login", showButton: "Login" }}
    />
  );
};

export default TempLogin;
