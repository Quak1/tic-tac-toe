import { useState, useContext } from "react";
import { Button, Typography } from "@mui/material";

import axios, { addAuthToken } from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import UsernameForm from "./UsernameForm";

interface LoginResponse {
  username: string;
  token: string;
  id: number;
}

const TempLogin = () => {
  const [showForm, setShowForm] = useState(false);
  const authContext = useContext(AuthContext);

  const loginUser = async (username: string) => {
    if (!username) return;

    const res = await axios.post<LoginResponse>("/login", { username });
    addAuthToken(res.data.token);
    authContext.setUser(res.data);

    setShowForm(false);
  };

  return (
    <>
      {showForm ? (
        <UsernameForm setShowForm={setShowForm} loginUser={loginUser} />
      ) : authContext.user ? (
        <Typography>{`${authContext.user.username}#${authContext.user.id}`}</Typography>
      ) : (
        <Button variant="contained" onClick={() => setShowForm(true)}>
          Play online
        </Button>
      )}
    </>
  );
};

export default TempLogin;
