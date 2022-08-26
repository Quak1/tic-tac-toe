import { useState, useContext } from "react";
import { LoadingButton } from "@mui/lab";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

import axios from "../../api/axios";
import AnswerChallengeDialog from "../Dialogs/AnswerChallengeDialog";
import { GameState, UserDetails } from "@backend/types";
import GameContext from "../../context/GameStatusProvider";

const WaitGameButton = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [opponent, setOpponent] = useState<UserDetails>();
  const gameContext = useContext(GameContext);

  const answerMatch = async (accept: boolean) => {
    try {
      const res = await axios.post<GameState>("/game/challenge/answer", {
        opponentId: opponent?.id,
        accept,
      });
      console.log(res.data);

      if (res.data.id) gameContext.setGameStatus(res.data);
    } catch (e) {
      // TODO notify fail to user
      // match is denied in server?
      console.log(e);
      alert("an error happened!");
    }
    setOpenDialog(false);
  };

  const onDialogClose = (_event?: object, reason?: string) => {
    if (reason === "escapeKeyDown") {
      answerMatch(false);
      setOpenDialog(false);
    }
  };

  const waitForGame = async () => {
    try {
      setLoading(true);
      const res = await axios.get<UserDetails>("/game/challenge/wait");

      setOpponent(res.data);
      setOpenDialog(true);
      console.log(res);
    } catch (e) {
      // TODO notify fail to user
      console.log(e);
    }
    setLoading(false);
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
