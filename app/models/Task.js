const { model, Schema } = require("mongoose");

const newTaskSchema = new Schema({
  name: {
    type: String,
    maxLength: 16,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  responsibleGroup: {
    type: String,
    maxLength: 12,
    required: true,
  },
});

module.exports = model("Task", newTaskSchema);
