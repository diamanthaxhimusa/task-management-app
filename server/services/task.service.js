const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const passport = require("passport");
const authN = passport.authenticate("jwt", { session: false });
const errService = require("../utils/send-errors");

/*
 * Base endpoint: /api/v1/{endpoint_path}
 */

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
  Task.setComplete(taskId, req.body.completed)
    .then((uTask) => {
      res.json(uTask);
    })
    .catch((err) => {
      errService.sendDbErr(res, err);
      return;
    });
});

// Delete
router.delete("/:id", authN, (req, res) => {
  const taskId = req.params.id;
  Task.deleteTask(taskId)
    .then(() => {
      res.json({ success: true });
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
