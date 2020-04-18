const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const ObjectId = mongoose.Types.ObjectId;

const schemaOptions = {
  timestamps: true,
  versionKey: false,
};

// User Schema
const UserSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  schemaOptions
);

UserSchema.options.toJSON = {
  transform: (doc, ret, options) => {
    delete ret.password;
  },
};

UserSchema.pre("save", function (next) {
  var user = this;
  var SALT_FACTOR = 10;

  // if password field is not changed go next and skip bcrypt
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserById = (id) => {
  return User.findById(id);
};

module.exports.updateUser = (id, updatedU) => {
  return User.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: updatedU },
    { new: true }
  );
};

module.exports.addUser = (newUser) => {
  return newUser.save();
};

module.exports.deleteUserById = (id) => {
  return User.findOneAndDelete({ _id: ObjectId(id) });
};

module.exports.findUserByEmail = (email) => {
  return User.findOne({ email: email });
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  return bcrypt
    .compare(candidatePassword, hash)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

module.exports.changePassword = (id, newPassword) => {
  return User.findOneAndUpdate(
    { _id: ObjectId(id) },
    {
      $set: {
        password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10), null),
      },
    },
    { new: true }
  );
};
