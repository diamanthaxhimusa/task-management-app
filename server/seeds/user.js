const mongoose = require("mongoose");
const User = require("../models/user");

// Loading Configuration
require("dotenv").config();

// Connecting to database
mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((ee) => {
    console.log("Connected to database");

    // Filling the user object with superadmin values
    var newUser = new User({
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
      password: "yoyoyo",
    });

    User.findUserByEmail(newUser.email)
      .then((user) => {
        if (user) {
          console.log("The user is already in database!");
          process.exit();
        } else {
          newUser.save((err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("User successfully saved!");
              process.exit();
            }
          });
        }
      })
      .catch(() => {
        console.log("Something went wrong while seeding!");
        process.exit();
      });
  })
  .catch((err) => {
    console.log("Error while database connection: " + err);
  });
