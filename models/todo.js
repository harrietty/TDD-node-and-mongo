const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = Schema({
  todo: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_on: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.moden('Todo', TodoSchema);
