const router = require("express").Router();
const User = require("../models/user");
const config = require("../config/database");
const jwt = require("jsonwebtoken");
const errService = require("../utils/send-errors");

/*
 * Base endpoint: /api/{endpoint_path}
 */

// Login Route
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findUserByEmail(email)
    .then((user) => {
      if (!user) {
        errService.sendNotFoundErrWithMsg(res, "User not found!");
        return;
      }

      User.comparePassword(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            errService.sendAuthErrWithMsg(res, "Wrong password!");
            return;
          }

          const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 86400,
          });

          res.json({
            success: true,
            token: "JWT " + token,
            user: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            },
          });
        })
        .catch((err) => {
          errService.sendDbErr(res, err);
        });
    })
    .catch((err) => {
      errService.sendDbErr(res, err);
    });
});

module.exports = router;
