var express = require("express");
const UserModel = require("../models/User");
var router = express.Router();
const ClientModel = require("../models/Clients");
const TaskModel = require("../models/Task");
const CompanyModel = require("../models/Company");
const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt");
const protectLogRoute = require("../middlewares/protectLogRoute");

router.get("/clients", protectLogRoute, async (req, res) => {
  try {
    res.json(await ClientModel.find().populate("task"));
  } catch (err) {
    res.json(err);
  }
});

router.get("/tasks", protectLogRoute, async (req, res) => {
  try {
    res.json(await TaskModel.find());
  } catch (err) {
    res.json(err);
  }
});

router.get("/tasks/:id", protectLogRoute, async (req, res) => {
  try {
    res.json(await TaskModel.findById(req.paramas.id));
  } catch (err) {
    res.json(err);
  }
});

router.post("/tasks", protectLogRoute, async (req, res) => {
  try {
    let task = await TaskModel.create(req.body);
    await ClientModel.findByIdAndUpdate(task.client, {
      $push: { task: `${task.id}` },
    });
    res.json(task);
  } catch (err) {
    res.json(err);
  }
});

router.get("/clients/:id", protectLogRoute, async (req, res) => {
  try {
    res.json(await ClientModel.findById(req.params.id).populate("task"));
  } catch (err) {
    res.json(err);
  }
});

router.patch("/edit/clients/:id", protectLogRoute, async (req, res) => {
  try {
    res.json(await ClientModel.findByIdAndUpdate(req.params.id, req.body));
  } catch (err) {
    res.json(err);
  }
});

router.patch("/edit/tasks/:id", protectLogRoute, async (req, res) => {
  try {
    res.json(await TaskModel.findByIdAndUpdate(req.params.id, req.body));
    console.log(req.params.id);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
