const Express = require("express");
const { getDBHandler } = require("../db");

const RequestHandler = Express.Router();

RequestHandler.post("/to-dos", async (req, res, next) => {
  try {
    const { title, description, isDone: is_done } = req.body;

    const dbHandler = await getDBHandler();
    const newTodo = await dbHandler.run(
      `INSERT INTO todos (title, description, is_done) 
       VALUES (
          '${title}',
          '${description}',
          ${is_done}
       )`
    );

    await dbHandler.close();

    res.send({
      todoAdded: {
        title,
        description,
        isDone: is_done,
      },
    });
  } catch (error) {
    res.status(500).send({
      error: `There was an unexpected error trying to create a new to do`,
      errorMessage: error.message,
      errorDetails: error,
    });
  }
});

RequestHandler.put("/to-dos/:id", async (req, res, next) => {
  try {
    const todoId = req.params.id;

    if (!todoId) {
      res.status(400).send({ error: `A to do id was expected, got ${todoId}` });
      next();
    }

    const { title, description, isDone: is_done } = req.body;

    const dbHandler = await getDBHandler();
    const updatedTodo = await dbHandler.run(
      `UPDATE todos 
        SET title = '${title}',
            description = '${description}',
            is_done = ${is_done}
       WHERE id = ${todoId}
      `
    );

    await dbHandler.close();

    res.send({
      updatedTodo: { title, description, isDone: is_done },
    });
  } catch (error) {
    res.status(500).send({
      error: `There was an unexpected error trying to update a to do`,
      errorMessage: error.message,
      errorDetails: error,
    });
  }
});

RequestHandler.get("/to-dos", async (req, res, next) => {
  try {
    const dbHandler = await getDBHandler();
    const todos = await dbHandler.all("SELECT * FROM todos");

    if (!todos) {
      res.status(404).send({ message: "To Dos Not Found" });
      next();
    }

    dbHandler.close();

    res.send(todos);
  } catch (error) {
    res.status(500).send({
      error: `There was an unexpected error trying to get the to dos`,
      errorMessage: error.message,
      errorDetails: error,
    });
  }
});

RequestHandler.get("/to-dos/:id", async (req, res, next) => {
  try {
    const todoId = req.params.id;

    const dbHandler = await getDBHandler();
    const todoFound = await dbHandler.get(
      "SELECT * FROM todos WHERE id = ?",
      todoId
    );

    if (!todoFound) {
      res.status(404).send({ message: "To Do Not Found" });
      next();
    }

    dbHandler.close();

    res.send(todoFound);
  } catch (error) {
    res.status(500).send({
      error: `There was an unexpected error trying to get the to dos`,
      errorMessage: error.message,
      errorDetails: error,
    });
  }
});

RequestHandler.delete("/to-dos/:id", async (req, res, next) => {
  try {
    const todoId = req.params.id;

    const dbHandler = await getDBHandler();
    const deletedTodo = await dbHandler.run(
      "DELETE FROM todos WHERE id = ?",
      todoId
    );

    dbHandler.close();

    res.send(deletedTodo);
  } catch (error) {
    res.status(500).send({
      error: `There was an unexpected error trying to delete a todo`,
      errorMessage: error.message,
      errorDetails: error,
    });
  }
});

module.exports = RequestHandler;
