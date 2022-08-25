import { useContext } from "react";

import axios, { addAuthToken } from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import ToggleableSingleInputForm from "../Forms/ToggleableSingleInputForm";
import { FormData } from "../Forms/SingleInputForm";

interface LoginResponse {
  username: string;
  token: string;
  id: number;
}

const TempLogin = () => {
  const authContext = useContext(AuthContext);

  const loginUser = async (data: FormData) => {
    try {
    const res = await axios.post<LoginResponse>("/login", {
      username: data.field,
    });

    addAuthToken(res.data.token);
    authContext.setUser(res.data);
    } catch (e) {
      // TODO notify user
      console.log(e)
      }
  };

  return (
    <ToggleableSingleInputForm
      onSubmit={loginUser}
      labels={{ label: "Username", button: "Login", showButton: "Login" }}
    />
  );
};

export default TempLogin;
