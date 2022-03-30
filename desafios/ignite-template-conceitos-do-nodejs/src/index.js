const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  
  const user = users.find(
    user => user.username === username
  );

  if (!username) {
    return response.status(400).json({ error: "Customer not found" });
  }

  request.user = user;
  
  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.some(
    user => user.name === name
  );

  if (userAlreadyExists) {
    return response.status(400).json({ error: "User already exists" });
  }

  users.push({
    id: uuidv4(),
    name,
    username,
    todos: []
  });

  return response.status(201).send();
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  
  return response.json(user.todos);

});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;
  
  const todoAlreadyExists = user.todos.some(
    todo => todo.title === title
  );

  if (todoAlreadyExists) {
    return response.status(400).json({ error: "Assignment already exists" });
  }

  user.todos.push({
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date
  });

  return response.status(201).send();

});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { username } = request.headers;
  const { title, deadline } = request.body;
  
  const { user } = request;
  const { id } = request.params;

  const todoIndex = user.todos.findIndex(
    todo => todo.id === id
  );

  if (todoIndex < 0) {
    return response.status(400).json({ error: "ID not found" });
  }

  const todo = user.todos[todoIndex];

  todo.title = title;
  todo.deadline = new Date(deadline);
  todo.created_at = new Date()

  return response.json(todo);
  
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { username } = request.headers;
  const { done } = request.body;
  
  const { user } = request;
  const { id } = request.params;

  const todoIndex = user.todos.findIndex(
    todo => todo.id === id
  );

  if (todoIndex < 0) {
    return response.status(400).json({ error: "ID not found" });
  }

  const todo = user.todos[todoIndex];

  todo.done = done;
  todo.created_at = new Date()

  return response.json({ message: `Todo was tagged as ${done}` });
  
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { username } = request.headers;
  
  const { user } = request;
  const { id } = request.params;

  const todoIndex = user.todos.findIndex(
    todo => todo.id === id
  );

  if (todoIndex < 0) {
    return response.status(400).json({ error: "ID not found" });
  }

  user.todos.splice(todoIndex, 1);

  return response.json({ message: `Todo ID ${id} deleted` });
  
});

module.exports = app;