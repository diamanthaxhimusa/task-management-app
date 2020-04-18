const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/database");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

// DB connection
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on("connected", () => {
    console.log("Successfully connected to database!");
  })
  .catch((err) => {
    console.log("Couldn't connect to DB! Error: ", err);
  });

const app = express();

// Port number
const port = process.env.SERVER_PORT;

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

app.use(helmet());

// Index Route
app.get("/", (req, res) => {
  res.send("Task Management App");
});

// Log every request into console
app.use(morgan("dev"));

app.listen(port, "0.0.0.0", () => {
  console.log("Server started on port: " + port);
});
