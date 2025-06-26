const mongoose = require("mongoose");
const schema = mongoose.Schema;
const TaskSchema = new schema(
  {
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model("Task", TaskSchema);
module.exports = {
  Task,
};
