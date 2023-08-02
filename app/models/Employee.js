const { model, Schema } = require("mongoose");

const newEmployeeSchema = new Schema({
  name: {
    type: String,
    maxLength: 16,
    required: true,
  },
  surname: {
    type: String,
    maxLength: 10,
    required: true,
  },
  group: {
    type: String,
    maxLength: 12,
    required: true,
  },
  employer: {
    type: String,
    maxLength: 16,
    required: true,
  },
  dateEmployed: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = model("Employee", newEmployeeSchema);
