const mongoose = require("mongoose");
// mongoose.sc
const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter a task"],
      },
      id: {
        type: Number,
        required: true,
        default: 0,
      },
      userID: {
        type: Number,
        required: true,
        default: 0,
      },
      completed: {
        type: Boolean,
        default: false,
      },
});

const task = mongoose.model("Task", taskSchema);
module.exports = task;
