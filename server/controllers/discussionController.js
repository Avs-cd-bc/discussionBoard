const mongoose = require("mongoose");
const User = mongoose.model("User");
const Topic = mongoose.model("Topic");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

function DiscussionController(){
  var self = this;
  self.user = function(req, res){

  }
  self.topic = function(req, res){

  }
  self.post = function(req, res){

  }
  self.comment = function(req, res){

  }
  self.index = function(req, res){

  }
}

module.exports = new DiscussionController();
