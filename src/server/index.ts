require("express-async-errors");

import app from "./app";
import { PORT } from "./config";

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
