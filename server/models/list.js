const mongoose = require("mongoose");
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
  return newList.save();
};

module.exports.deleteList = (id) => {
  let list = List.findById(id);
  console.log("list.tasks", list.tasks);

  return List.deleteOne({ _id: ObjectId(id) });
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
