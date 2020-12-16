const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    clients: { type: Schema.Types.ObjectId, ref: "clients" },
    task_associated: String,
    task_deadline: { type: Date, default: Date.now },
    priority: Number,
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("task", taskSchema);

module.exports = TaskModel;
