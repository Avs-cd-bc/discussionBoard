const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {type: String, required: true, unique: true, minlength: 3, maxlength: 15},
  topics:[{type: mongoose.Schema.Types.ObjectId, ref: "Topic"}],
  posts:[{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
  comments:[{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
}, {timestamps: true});

mongoose.model("User", UserSchema);
