import { useContext, useState } from "react";

import GameContext from "../../context/GameStatusProvider";
import ToggleableSingleInputForm from "../Forms/ToggleableSingleInputForm";
import { FormData } from "../Forms/SingleInputForm";
import axios from "../../api/axios";
import NotificationDialog from "../Dialogs/NotificationDialog";
import LoadingDialog from "../Dialogs/LoadingDialog";

interface ChallengePlayerFormProps {
  challengePlayer: (data: FormData) => void;
}

const ChallengePlayerForm = ({ challengePlayer }: ChallengePlayerFormProps) => {
  // TODO don't show play online form if
  // waiting for player or already in a match
  return (
    <ToggleableSingleInputForm
      onSubmit={challengePlayer}
      labels={{
        label: "Username",
        button: "Challenge",
        showButton: "Play online",
      }}
    />
  );
};

export const ChallengePlayer = () => {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [waitingChallengeReply, setWaitingChallengeReply] = useState(false);
  const gameContext = useContext(GameContext);

  const challengePlayer = async (data: FormData) => {
    try {
      setWaitingChallengeReply(true);
      const opponent = data.field.replace("#", "-");
      const res = await axios.get(`/game/challenge/${opponent}`);

      if (!res.data.id) {
        setNotificationMessage("Challenge Denied");
      } else {
        setNotificationMessage("Challenge Accepted");
        gameContext.setGameStatus(res.data);
      }
      setWaitingChallengeReply(false);
      setOpenNotification(true);
    } catch (e) {
      // TODO notify user
      console.log(e);
    }
  };

  return (
    <>
      {waitingChallengeReply ? (
        <div>waiting challenge reply</div>
      ) : (
        <ChallengePlayerForm challengePlayer={challengePlayer} />
      )}
      <NotificationDialog
        open={openNotification}
        onClose={() => setOpenNotification(false)}
        title={notificationMessage}
      />
      <LoadingDialog
        open={waitingChallengeReply}
        onClose={() => setWaitingChallengeReply(false)}
        title="Waiting for challenge reply"
      />
    </>
  );
};

export default ChallengePlayer;
