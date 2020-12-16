var express = require("express");
const UserModel = require("../models/User");
var router = express.Router();
const ClientModel = require("../models/Clients");
const TaskModel = require("../models/Clients");
const CompanyModel = require("../models/Company");
const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt");

router.get("/clients", async (req, res) => {
  try {
    res.json(await ClientModel.find());
  } catch (err) {
    res.json(err);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    res.json(await TaskModel.find());
  } catch (err) {
    res.json(err);
  }
});

router.post("/tasks", async (req, res) => {
  try {
    res.json(await TaskModel.create(req.body));
  } catch (err) {
    res.json(err);
  }
});

router.get("/clients/:id", async (req, res) => {
  try {
    res.json(await ClientModel.findById(req.params.id));
  } catch (err) {
    res.json(err);
  }
});

router.patch("/edit/clients/:id", async (req, res) => {
  try {
    res.json(await ClientModel.findByIdAndUpdate(req.params.id, req.body));
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
