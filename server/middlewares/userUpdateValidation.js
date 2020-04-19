const errService = require("../utils/send-errors");

module.exports = (req, res, next) => {
  // Validation Rules
  req.checkBody("firstName", "First name is required!").notEmpty();
  req.checkBody("lastName", "Last name is required!").notEmpty();
  req.checkBody("email", "Email invalid!").isEmail();
  var errors = req.validationErrors();

  if (errors) {
    errService.sendInvalidDataErr(res, errors);
    return;
  } else {
    next();
  }
};
