const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 3001;
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test');
app.listen(port, () => {
  console.log('server is running');
});
app.get('/', async (req, res) => {
  const result = await TodoModel.find({});
  res.send(result);
});

// JSON.parse  JSON -> JS object
// JSON.stringify JS object -> JSON
// app.get('/:id', (req, res) => {
//     const{id} = req.params;
//     TodoModel.findById
//     res.send('GET request to homepage');
//   });
app.post('/add', async (req, res) => {
  try {
    const {task, completed, isEditing} = req.body;
    const result = await TodoModel.create({
      task: task,
      completed: completed,
      isEditing: isEditing,
    });

    res.send(result);
  } catch (error) {
    console.log('error', error);
  }
});

app.post('/update', async (req, res) => {
  try {
    const {_id, task} = req.body;
    const result = await TodoModel.findByIdAndUpdate(_id, {task: task}, {new: true});
    res.send(result);
  } catch (error) {
    console.log('error', error);
  }
});
app.delete('/delete/:id', async (req, res) => {
  try {
    const result = await TodoModel.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    console.log('error', error);
  }
});
