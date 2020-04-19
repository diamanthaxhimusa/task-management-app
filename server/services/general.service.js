const router = require("express").Router();
const User = require("../models/user");
const config = require("../config/database");
const jwt = require("jsonwebtoken");
const errService = require("../utils/send-errors");
const userValidation = require("../middlewares/user_validation");

/*
 * Base endpoint: /api/v1/{endpoint_path}
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

// Register Route
router.post("/register", userValidation, (req, res) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  User.findUserByEmail(newUser.email)
    .then((exists) => {
      if (exists) {
        errService.sendInvalidDataErr(res, "This email already exists!");
        return;
      } else {
        User.addUser(newUser)
          .then((cUser) => {
            const token = jwt.sign(cUser.toJSON(), config.secret, {
              expiresIn: 86400,
            });
            res.json({
              success: true,
              token: "JWT " + token,
              user: cUser,
            });
          })
          .catch((err) => {
            errService.sendDbErr(res, err);
            return;
          });
      }
    })
    .catch((err) => {
      errService.sendDbErr(res, err);
      return;
    });
});

module.exports = router;
