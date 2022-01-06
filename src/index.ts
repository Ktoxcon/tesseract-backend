import App from "./app/server";
import config from "../src/config/config";

import { displayServerRunningMessage } from "./utils/prompt";

const {
  server: { port },
} = config;

App.listen(port, () => {
  displayServerRunningMessage(port);
});
