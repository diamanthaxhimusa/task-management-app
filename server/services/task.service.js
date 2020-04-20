const router = require("express").Router();
const Task = require("../models/task");
const List = require("../models/list");
const passport = require("passport");
const authN = passport.authenticate("jwt", { session: false });
const errService = require("../utils/send-errors");

/*
 * Base endpoint: /api/v1/{endpoint_path}
 */

//  Get user tasks
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

// Create
router.post("/", authN, (req, res) => {
  const { id } = req.user;
  let newTask = new Task({ user: id, ...req.body });
  Task.addTask(newTask)
    .then((cTask) => {
      List.addTask(newTask);
      res.json(cTask);
    })
    .catch((err) => {
      errService.sendDbErr(res, err);
      return;
    });
});

// Complete
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

// edit
router.put("/:id", authN, (req, res) => {
  const taskId = req.params.id;
  Task.findById(taskId, (err, task) => {
    if (task) {
      List.removeTask(task.list, taskId, req.body.list).then(() => {
        Task.updateTask(taskId, req.body)
          .then((uTask) => {
            res.json(uTask);
          })
          .catch((err) => {
            errService.sendDbErr(res, err);
            return;
          });
      });
    }
  });
});

module.exports = router;
