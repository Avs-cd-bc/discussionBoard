const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

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

  self.index = function(req, res){
    /*~~~~ Promise Pattern ~~~~*/
    var response = {};
    Category.find({}).exec()
    .then(function(categories){
      response.categories = categories;
      return Topic.find({}).populate("_user").exec();
    })
    .then(function(topics){
      response.success = true;
      response.topics = topics;
      res.json(response);
    })
    .catch(function(err){
      res.json(err);
    });

    /*~~~~ Callback Pattern ~~~~*/
    // Category.find({}, function(err, categories){
    //   if(err) res.json(err)
    //   else{
    //     // Pull down all the topics and populate the users
    //     Topic.find({}).populate("_user").exec(function(err, topics){
    //       if(err) res.json(err);
    //       else{
    //         res.json({success: true, topics, categories});
    //       }
    //     });
    //   }
    // });
  }

/* Promise Pattern*/
  self.post = function(req, res){

    var temp = {};
    console.log(req.body);
    User.findOne({_id: req.body._user}).exec()
    .then(function(user){
      temp.user = user;
      console.log(temp);
      return Topic.findOne({_id: req.body._topic}).exec();
    })
    .then(function(topic){
      temp.topic = topic;
      console.log(temp);
      const postContents = {
        _user: temp.user._id,
        _topic: temp.topic._id,
        content: req.body.content
      };
      const tempPost = new Post(postContents);
      return tempPost.save();
    })
    .then(function(newPost){
      temp.newPost = newPost;
      temp.topic.posts.push(newPost._id);
      console.log(temp);
      return temp.topic.save();
    })
    .then(function(updatedTopic){
      temp.topic = updatedTopic;
      temp.user.posts.push(temp.newPost._id);
      console.log(temp);
      return temp.user.save();
    })
    .then(function(updatedUser){
      temp.user = updatedUser;
      console.log(temp);
      res.json({
        success: true,
        topic: temp.topic,
        user: temp.user,
        post: temp.post
      });
    })
    .catch(function(err){
      res.json(err)
    });

    /* ~~~~ Callback Pattern ~~~~ */
    // User.findOne({_id: req.body._user}, function(err, user){
    //   if(err) res.json(err)
    //   else{
    //     // finding the post's parent topic
    //     Topic.findOne({_id: req.body._topic}, function(err, topic){
    //       if(err) res.json(err)
    //       else{
    //         // creating the new post
    //         const postContents = {
    //           _user: user._id,
    //           _topic: topic._id,
    //           content: req.body.content
    //         }
    //         const tempPost = new Post(postContents);
    //         tempPost.save(function(err, newPost){
    //           if(err) res.json(err)
    //           else{
    //             // updating and saving the topic
    //             topic.posts.push(newPost._id);
    //             topic.save(function(err, updatedTopic){
    //               if(err) res.json(err)
    //               else{
    //                 // updating and saving the user
    //                 user.posts.push(newPost._id);
    //                 user.save(function(err, updatedUser){
    //                   if(err) res.json(err)
    //                   else{
    //                     res.json({
    //                       success: true,
    //                       topic: updatedTopic,
    //                       user: updatedUser,
    //                       post: newPost
    //                     });
    //                   }
    //                 });
    //               }
    //             });
    //           }
    //         });
    //       }
    //     });
    //   }
    // });
  }
  self.comment = function(req, res){

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
