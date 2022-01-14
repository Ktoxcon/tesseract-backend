const Express = require("express");
const { initializeDB } = require("./db");
const {
  displayServerRunningMessage,
  displayDBInitializedMessage,
} = require("./utils/prompt");

const appPort = 3000;
const App = Express();

App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));

App.listen(appPort, () => {
  displayServerRunningMessage(appPort);
  initializeDB().then(displayDBInitializedMessage);
});
