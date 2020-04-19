const router = require("express").Router();
const User = require("../models/user");
const passport = require("passport");
const userUpdateValidation = require("../middlewares/userUpdateValidation");
const checkCurrentPassword = require("../middlewares/check_current_password");
const changePasswordValidation = require("../middlewares/change_password_validation");
const authN = passport.authenticate("jwt", { session: false });
const errService = require("../utils/send-errors");

/*
 * Base endpoint: /api/users
 */
// Change password
router.put(
  "/change-password",
  authN,
  checkCurrentPassword,
  changePasswordValidation,
  (req, res) => {
    User.changePassword(req.user._id, req.body.newPassword)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        errService.sendDbErr(res, err);
        return;
      });
  }
);

// Update
router.put("/:id", authN, userUpdateValidation, (req, res) => {
  const userId = req.params.id;

  let updatedUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email.toLowerCase(),
    gender: req.body.gender,
    profileImg: req.body.profileImg,
    role: req.body.role,
  };

  User.findCountByEmail(updatedUser.email)
    .then((count) => {
      User.getUserById(userId)
        .then((existingUser) => {
          if (!existingUser) {
            errService.sendNotFoundErrWithMsg(res, "User doesn't exist!");
            return;
          }

          if (existingUser.email == updatedUser.email) {
            User.updateUser(userId, updatedUser)
              .then((uUser) => {
                res.json(uUser);
              })
              .catch((err) => {
                errService.sendDbErr(res, err);
                return;
              });
          } else if (existingUser.email != req.body.email && count >= 1) {
            errService.sendConflictErrWithMsg(res, "Email already exists!");
            return;
          } else {
            User.updateUser(userId, updatedUser)
              .then((uUser) => {
                res.json(uUser);
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
    })
    .catch((err) => {
      errService.sendDbErr(res, err);
      return;
    });
});

module.exports = router;
