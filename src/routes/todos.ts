import * as Express from "express";

const toDosRouter = Express.Router();

toDosRouter.get("/to-dos");
toDosRouter.get("/to-dos/:id");
toDosRouter.put("/to-dos/:id");
toDosRouter.patch("/to-dos/:id");
toDosRouter.delete("/to-dos/:id");

export default toDosRouter;
