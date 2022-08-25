import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

import axios from "../../api/axios";
import AnswerChallengeDialog from "../Dialogs/AnswerChallengeDialog";
import { GameState, UserDetails } from "@backend/types";

const WaitGameButton = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [opponent, setOpponent] = useState<UserDetails>();

  const answerMatch = async (accept: boolean) => {
    try {
      const res = await axios.post<GameState>("/game/challenge/answer", {
        opponentId: opponent?.id,
        accept,
      });
      console.log(res.data);
    } catch (e) {
      console.log(e);
      alert("an error happened!");
    } finally {
      setOpenDialog(false);
    }
  };

  const onDialogClose = (_event?: object, reason?: string) => {
    if (reason === "escapeKeyDown") {
      answerMatch(false);
      setOpenDialog(false);
    }
  };

  const waitForGame = async () => {
    setLoading(true);
    const res = await axios.get<UserDetails>("/game/challenge/wait");
    setLoading(false);

    if (res.data) {
      setOpponent(res.data);
      setOpenDialog(true);
    }
    console.log(res);
  };

  return (
    <>
      <LoadingButton
        variant="contained"
        onClick={waitForGame}
        loading={loading}
        endIcon={<SportsKabaddiIcon />}
        loadingPosition="end"
      >
        {loading ? "Waiting for game" : "Wait for game"}
      </LoadingButton>
      <AnswerChallengeDialog
        open={openDialog}
        accept={() => answerMatch(true)}
        deny={() => answerMatch(false)}
        onClose={onDialogClose}
      />
    </>
  );
};

export default WaitGameButton;
