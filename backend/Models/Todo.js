const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
  isEditing: Boolean,
});

const TodoModel = mongoose.model('todo', TodoSchema);
module.exports = TodoModel;
