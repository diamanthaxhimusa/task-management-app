const router = require("express").Router();
const List = require("../models/list");
// const Task = require("../models/task");
const passport = require("passport");
const authN = passport.authenticate("jwt", { session: false });
const errService = require("../utils/send-errors");

/*
 * Base endpoint: /api/v1/{endpoint_path}
 */

//  Get user Lists
router.get("/", authN, (req, res) => {
  const { id } = req.user;
  List.getUserLists(id)
    .populate("tasks")
    .then((uLists) => {
      res.json(uLists);
    })
    .catch((err) => {
      errService.sendDbErr(res, err);
      return;
    });
});

// Create
router.post("/", authN, (req, res) => {
  const { id } = req.user;
  let newList = new List({ user: id, ...req.body });
  List.addList(newList)
    .then((cList) => {
      List.addList(newList);
      res.json(cList);
    })
    .catch((err) => {
      errService.sendDbErr(res, err);
      return;
    });
});

// Delete
router.delete("/:id", authN, (req, res) => {
  const listId = req.params.id;
  List.deleteList(listId)
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
  const listId = req.params.id;
  List.updateList(listId, req.body)
    .then((uList) => {
      res.json(uList);
    })
    .catch((err) => {
      errService.sendDbErr(res, err);
      return;
    });
});

module.exports = router;
