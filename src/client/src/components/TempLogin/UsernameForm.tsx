import { useState, ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";

interface Props {
  setShowForm: (value: boolean) => void;
  loginUser: (username: string) => void;
}

const UsernameForm = ({ setShowForm, loginUser }: Props) => {
  const [username, setUsername] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <TextField label="Username" value={username} onChange={handleChange} />
      <Button variant="contained" onClick={() => loginUser(username)}>
        Login
      </Button>
      <Button variant="outlined" onClick={() => setShowForm(false)}>
        Cancel
      </Button>
    </>
  );
};

export default UsernameForm;
