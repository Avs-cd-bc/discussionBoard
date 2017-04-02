const discussion = require("../controllers/discussionController.js");


module.exports = function(app){
  app.post("/login", discussion.login);
  app.post("/topic", discussion.topic);
  app.post("/topicFull", discussion.getTopic);
  app.post("/post", discussion.post);
  // app.post("/comment", discussion.comment);
  // // This will pull down EVERYTHING from the DB, all topics, posts, and comments - will be called upon loading the dashboard
  app.get("/index", discussion.index);
}
