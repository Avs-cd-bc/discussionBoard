const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  _user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  _topic:{type: mongoose.Schema.Types.ObjectId, ref: "Topic"},
  content: {type: String, required: true, minlength: 1},
  upvotes: {type: Number},
  downvotes: {type: Number},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
}, {timestamps: true});

mongoose.model("Post", PostSchema);
