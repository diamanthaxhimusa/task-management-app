const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const passport = require("passport");
const authN = passport.authenticate("jwt", { session: false });
const errService = require("../utils/send-errors");

router.get("/", authN, (req, res) => {
  const { id } = req.user;
  Task.getUserTasks(id)
    .then((uTasks) => {
      res.json(uTasks);
    })
    .catch((err) => {
      errService.sendDbErr(res, err);
      return;
    });
});

router.post("/", authN, (req, res) => {
  const { id } = req.user;
  let newTask = new Task({ user: id, ...req.body });
  Task.addTask(newTask)
    .then((cTask) => {
      res.json(cTask);
    })
    .catch((err) => {
      errService.sendDbErr(res, err);
      return;
    });
});

router.put("/:id/set-complete", authN, (req, res) => {
  const taskId = req.params.id;
  Task.setComplete(taskId, req.body.complete)
    .then((uTask) => {
      res.json(uTask);
    })
    .catch((err) => {
      errService.sendDbErr(res, err);
      return;
    });
});

router.put("/:id", authN, (req, res) => {
  const taskId = req.params.id;
  Task.updateTask(taskId, req.body)
    .then((uTask) => {
      res.json(uTask);
    })
    .catch((err) => {
      errService.sendDbErr(res, err);
      return;
    });
});

module.exports = router;
