import { useState } from "react";
import { Button } from "@mui/material";

import SingleInputForm, {
  Props as SingleInputFormProps,
} from "./SingleInputForm";

type Props = SingleInputFormProps & {
  labels: {
    showButton: string;
  };
};

const ToggleableSingleInputForm = (props: Props) => {
  const [showForm, setShowForm] = useState(false);
  const { onCancel, labels } = props;

  const handleCancel = () => {
    if (onCancel) onCancel();
    setShowForm(false);
  };

  return showForm ? (
    <SingleInputForm {...props} onCancel={handleCancel} />
  ) : (
    <Button variant="contained" onClick={() => setShowForm(true)}>
      {labels.showButton}
    </Button>
  );
};

export default ToggleableSingleInputForm;
