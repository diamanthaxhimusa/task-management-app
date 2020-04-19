const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const schemaOptions = {
  timestamps: true,
  versionKey: false,
};

// Task Schema
const TaskSchema = mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    due_date: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  schemaOptions
);

const Task = (module.exports = mongoose.model("Task", TaskSchema));

module.exports.addTask = (newTask) => {
  return newTask.save();
};

module.exports.updateTask = (id, updatedTask) => {
  return Task.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: updatedTask },
    { new: true }
  );
};

module.exports.getTaskById = (id) => {
  return Task.findById(id);
};

module.exports.setComplete = (id, completed) => {
  return Task.findOneAndUpdate(
    { _id: ObjectId(id) },
    {
      $set: {
        completed,
      },
    },
    { new: true }
  );
};

module.exports.getUserTasks = (id) => {
  return Task.find({ user: id });
};