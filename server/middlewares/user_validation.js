module.exports = (req, res, next) => {
  // Validation Rules
  req.checkBody("firstName", "Fist name is required!").notEmpty();
  req.checkBody("lastName", "Last name is required!").notEmpty();
  req.checkBody("email", "Email is required!").isEmail();
  req
    .checkBody(
      "password",
      "New password is invalid, please use six characters minimum!"
    )
    .isLength({ min: 6 });
  var errors = req.validationErrors();

  if (errors) {
    res.json({
      errVld: errors,
    });
  } else {
    next();
  }
};
