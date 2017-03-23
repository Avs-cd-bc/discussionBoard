const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  _post: {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
  content: {type: String, require: true, minlength: 1}
}, {timestamps: true});

mongoose.model("Comment", CommentSchema);
