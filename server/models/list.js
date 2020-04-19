const mongoose = require("mongoose");
const Task = require("./task");
const ObjectId = mongoose.Types.ObjectId;

const schemaOptions = {
  timestamps: true,
  versionKey: false,
};

// List Schema
const ListSchema = mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    tasks: [{ type: ObjectId, ref: "Task" }],
  },
  schemaOptions
);

const List = (module.exports = mongoose.model("List", ListSchema));

module.exports.addList = (newList) => {
  return Task.updateManyTasks(newList.tasks, { list: newList._id }).then(() =>
    newList.save()
  );
};

module.exports.deleteList = (id) => {
  return List.findById(id).then((list) => {
    Task.updateManyTasks(list.tasks, { list: null }).then(() =>
      List.deleteOne({ _id: ObjectId(id) })
    );
  });
};

module.exports.updateList = (id, updatedList) => {
  return List.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: updatedList },
    { new: true }
  );
};

module.exports.addTask = (task) => {
  return List.findById(task.list, (err, list) => {
    if (list) {
      list.tasks.push(task);
      list.save();
    }
  });
};

module.exports.getListById = (id) => {
  return List.findById(id);
};

module.exports.getUserLists = (id) => {
  return List.find({ user: id });
};
