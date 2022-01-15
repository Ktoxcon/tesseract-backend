const Express = require("express");
const { initializeDB } = require("./db");
const {
  displayServerRunningMessage,
  displayDBInitializedMessage,
} = require("./utils/prompt");
const RequestHandler = require("./handlers/todos");

const appPort = 3000;
const App = Express();

App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));
App.use("/v1", RequestHandler);

App.listen(appPort, () => {
  displayServerRunningMessage(appPort);
  initializeDB().then(displayDBInitializedMessage);
});
