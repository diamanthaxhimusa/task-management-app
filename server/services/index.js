const router = require("express").Router();

const generalService = require("./general.service");

/*
 * Base endpoint: /api/{service_base_endpoint}
 */

router.use("/", generalService);

module.exports = router;
