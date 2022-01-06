import * as Express from "express";
import * as cors from "cors";
import ToDosRouter from "../routes/todos";

const App = Express();

App.use(cors({ origin: true }));
App.use(Express.json());

App.use("/v1", ToDosRouter);

export default App;
