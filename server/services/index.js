const router = require("express").Router();

const generalService = require("./general.service");
const taskService = require("./task.service");
const userService = require("./user.service");
const listService = require("./list.service");

/*
 * Base endpoint: /api/v1/{service_base_endpoint}
 */

router.use("/", generalService);
router.use("/users", userService);
router.use("/tasks", taskService);
router.use("/lists", listService);

module.exports = router;
