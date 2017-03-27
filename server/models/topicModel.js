const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
  content: {type: String, required: true, minlength: 3, maxlength: 50},
  description: {type: String, required: true, minlength: 3, maxlenght: 200},
  category: {type: String, required: true},
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
}, {timestamps: true});

mongoose.model("Topic", TopicSchema);
