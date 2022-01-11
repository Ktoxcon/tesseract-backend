import * as Express from "express";
import { v4 as uuid } from "uuid";
import { resolve } from "path";
import { writeFileSync } from "fs";
import { getDbContent } from "../utils/db";

const RequestHandler = Express.Router();
const dbFilePath = `${resolve()}\\src\\db\\db.json`;

RequestHandler.get("/to-dos", (_req, res, _next) => {
  const dbContent = getDbContent(dbFilePath);
  res.send(dbContent.todos);
});

RequestHandler.get("/to-dos/:id", (req, res, next) => {
  const todoId = req.params.id;
  const dbContent = getDbContent(dbFilePath);

  if (!dbContent.todos || !dbContent.todos.length) {
    res.status(404).send({ warning: "To dos not found" });
    next();
  }

  const todoFound = dbContent.todos
    .filter((todo: any) => todo.id === todoId)
    .shift();

  if (!todoFound) {
    res.status(404).send({ warning: "To do not found" });
    next();
  }

  res.send(todoFound);
});

RequestHandler.post("/to-dos", (req, res, _next) => {
  const { title, description, status, done } = req.body;
  const newTodo = { id: uuid(), title, description, status, done };

  const oldDbContent = getDbContent(dbFilePath);
  const newDbContent = { todos: [...oldDbContent.todos, newTodo] };

  writeFileSync(dbFilePath, JSON.stringify(newDbContent));

  res.send(newDbContent.todos);
});

RequestHandler.delete("/to-dos/:id", (req, res, next) => {
  const todoId = req.params.id;
  const dbContent = getDbContent(dbFilePath);

  if (!dbContent.todos || !dbContent.todos.length) {
    res.status(404).send({ warning: "To dos not found" });
    next();
  }

  const updatedTodos = dbContent.todos.filter(
    (todo: any) => todo.id !== todoId
  );
  const newDbContent = { todos: updatedTodos };

  writeFileSync(dbFilePath, JSON.stringify(newDbContent));

  res.send(updatedTodos);
});

RequestHandler.put("/to-dos/:id", (req, res, next) => {
  const dbContent = getDbContent(dbFilePath);

  if (!dbContent.todos || !dbContent.todos.length) {
    res.status(404).send({ warning: "To dos not found" });
    next();
  }

  const todoId = req.params.id;
  const { title, description, status, done } = req.body;
  const newTodoData = { title, description, status, done };

  const todoData = dbContent.todos
    .filter((todo: any) => todo.id === todoId)
    .shift();

  if (!todoData) {
    res.status(404).send({ warning: "To do not found" });
    next();
  }

  const updatedTodo = { ...todoData, ...newTodoData };
  const todos = dbContent.todos.filter((todo: any) => todo.id !== todoId);
  const newDbContent = {
    todos: [...todos, updatedTodo],
  };

  writeFileSync(dbFilePath, JSON.stringify(newDbContent));

  res.send(updatedTodo);
});

export default RequestHandler;
