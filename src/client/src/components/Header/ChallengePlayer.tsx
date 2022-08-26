import { useContext } from "react";

import GameContext from "../../context/GameStatusProvider";
import ToggleableSingleInputForm from "../Forms/ToggleableSingleInputForm";
import { FormData } from "../Forms/SingleInputForm";
import axios from "../../api/axios";

const ChallengePlayerForm = () => {
  const gameContext = useContext(GameContext);

  const challengePlayer = async (data: FormData) => {
    try {
      const res = await axios.get(`/game/challenge/${data.field}`);
      console.log(res);
      gameContext.setGameStatus(res.data);
    } catch (e) {
      // TODO notify user
      console.log(e);
    }
  };

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

export default ChallengePlayerForm;
