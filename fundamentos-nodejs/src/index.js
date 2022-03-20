const express = require('express')

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Cursos sempreON'});
});

app.get('/courses', (req, res) => {
  const query = req.query;
  console.log(query);
  return res.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post('/courses', (req, res) => {
  const body = req.body;
  console.log(body);
  return res.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.put('/courses/:id', (req, res) => {
  const params = req.params;
  console.log(params);
  return res.json(["Curso 4", "Curso 5", "Curso 6"]);
});

app.patch('/courses/:id', (req, res) => {
  return res.json(["Curso 7", "Curso 8", "Curso 9"]);
});

app.delete('/courses/:id', (req, res) => {
  return res.json(["Curso 7", "Curso 2", "Curso 2"]);
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
