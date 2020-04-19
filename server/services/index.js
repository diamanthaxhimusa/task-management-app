const router = require("express").Router();

const generalService = require("./general.service");
const taskService = require("./task.service");

/*
 * Base endpoint: /api/{service_base_endpoint}
 */

router.use("/", generalService);
router.use("/tasks", taskService);

module.exports = router;
