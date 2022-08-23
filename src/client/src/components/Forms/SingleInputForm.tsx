import { Button, TextField, Box } from "@mui/material";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (data: any) => void;
  labels: {
    label: string;
    button: string;
  };
  stacked?: boolean;
  onCancel?: () => void;
  validation?: Record<string, any>;
}

interface FormData {
  field: string;
}

const SingleInputForm = ({
  onSubmit,
  labels,
  stacked,
  onCancel,
  validation,
}: Props) => {
  const { register, handleSubmit } = useForm<FormData>();
  const { onChange, name, ref } = register("field", {
    required: true,
    ...validation,
  });

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const gap = 1;
  const styles = {
    container: {
      display: "flex",
      flexDirection: stacked ? "column" : "row",
      width: "fit-content",
      gap: gap,
    },
    buttons: {
      display: "flex",
      justifyContent: "center",
      gap: gap,
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.container}>
        <TextField
          label={labels.label}
          onChange={onChange}
          name={name}
          inputRef={ref}
          size="small"
        />
        <Box sx={styles.buttons}>
          <Button variant="contained" type="submit">
            {labels.button}
          </Button>
          <Button variant="outlined" type="reset" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default SingleInputForm;
