import * as Express from "express";
import RequestHandler from "./handlers/todos";
import { displayServerRunningMessage } from "./utils/prompt";

const appPort = 3000;
const App = Express();

App.use(Express.json());
App.use(Express.urlencoded());
App.use("/v1", RequestHandler);

App.listen(appPort, () => {
  displayServerRunningMessage(appPort);
});
