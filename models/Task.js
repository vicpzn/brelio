const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: "clients" },
    task_associated: String,
    task_deadline: { type: Date, default: Date.now },
    priority: Number,
    creator: { type: Schema.Types.ObjectId, ref: "user" },
    priority: String,
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("task", taskSchema);

module.exports = TaskModel;
