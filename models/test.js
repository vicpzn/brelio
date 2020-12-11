const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema(
  {
    name: String,
    activity: String,
  },
  { timestamps: true }
);

const TestModel = mongoose.model("test", testSchema);

module.exports = TestModel;
