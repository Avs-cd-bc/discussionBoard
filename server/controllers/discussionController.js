const mongoose = require("mongoose");
const User = mongoose.model("User");
const Topic = mongoose.model("Topic");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");
const Category = mongoose.model("Category");

function DiscussionController(){
  var self = this;
  self.users = [];
  self.login = function(req, res){
    // find if the username exists in the db
    User.findOne({name: req.body.name}, function(err, user){
      if(err) res.json(err)
      // If we are returned a user, check if they have already logged in
      else if(user){
        login(user, res);
      }
      // If we aren't returned a user, we must create one in the DB and log them in.
      else{
        createUser(req.body.name, res);
      }
    });
  }
  self.topic = function(req, res){
    // find the user posting the topic
    User.findOne({name: req.body._user}, function(err, user){
      if(err) res.json(err)
      else{
        // if we find them change the topicContent User to the id
        const topicContents = req.body;
        topicContents._user = user._id;
        // create a temp topic
        const tempTopic = new Topic(topicContents);
        // save the new topic, return the new topic
        tempTopic.save(function(err, newTopic){
          if(err) res.json(err);
          else{
            // need to add the new topic to the user as well
            user.topics.push(newTopic._id);
            user.save(function(err, updatedUser){
              if(err) res.json(err);
              else {
                res.json({succes: true, newTopic});
              }
            });
          }
        });
      }
    });
  }
  // need to populate all the posts for the topic (which shouldhave already been done by index, and populate all the comments for the posts)
  self.getTopic = function(req, res){
    Topic.findOne({_id: req.body._id})
    .populate([{path: "_user"}, {path: "posts", populate: {path: "comments"}}]).exec(function(err, popTopic){
      if(err) res.json(err);
      else {
        res.json({success: true, popTopic});
      }
    });
  }

// There has to be a cleaner way to do this....
  self.post = function(req, res){
    console.log(req.body);
    // Finding the posting user
    User.findOne({_id: req.body._user}, function(err, user){
      if(err) res.json(err)
      else{
        // finding the post's parent topic
        Topic.findOne({_id: req.body._topic}, function(err, topic){
          if(err) res.json(err)
          else{
            // creating the new post
            const postContents = {
              _user: user._id,
              _topic: topic._id,
              content: req.body.content
            }
            const tempPost = new Post(postContents);
            tempPost.save(function(err, newPost){
              if(err) res.json(err)
              else{
                // updating and saving the topic
                topic.posts.push(newPost._id);
                topic.save(function(err, updatedTopic){
                  if(err) res.json(err)
                  else{
                    // updating and saving the user
                    user.posts.push(newPost._id);
                    user.save(function(err, updatedUser){
                      if(err) res.json(err)
                      else{
                        res.json({
                          success: true,
                          topic: updatedTopic,
                          user: updatedUser,
                          post: newPost
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
  self.comment = function(req, res){

  }
  self.index = function(req, res){
    var info = {};
    // pull down all the categories for topic creation
    Category.find({}, function(err, categories){
      if(err) res.json(err)
      else{
        // Pull down all the topics and populate the users
        Topic.find({}).populate("_user").exec(function(err, topics){
          if(err) res.json(err);
          else{
            res.json({success: true, topics, categories});
          }
        });
      }
    });
  }

  function createUser(name, res){
    const tempUser = new User({name});
    tempUser.save(function(err, newUser){
      if(err) res.json(err)
      else{
        self.users.push(newUser.name);
        console.log(`${newUser.name} account created and logged in!`);
        res.json({user: newUser, success: true, message: `${newUser.name} account created and logged in!`});
      }
    });
  }

  function login(user, res){
    if(self.users.includes(user.name)){
      console.log("found user, already logged in!");
      res.json({message: "User Already Logged In", kind: "Login Error"});
    }
    else{
      self.users.push(user.name);
      console.log(`${user.name} logged in!`);
      res.json({user, success: true, message: `${user.name} logged in!`});
    }
  }
}

module.exports = new DiscussionController();
