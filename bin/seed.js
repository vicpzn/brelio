require("dotenv").config();
require("../config/mongodb");
const TestModel = require("./../models/test");

const test = [
  { name: "Foo", activity: "Bar" },
  { name: "Bar", activity: "Foo" },
];

async function insertion() {
  try {
    await TestModel.deleteMany();
    TestModel.insertMany(test);
    console.log("Inserted Stuff");
  } catch (err) {
    console.error(err);
  }
}

insertion();
