angular.module("app").controller("topicController", topicController);

function topicController($location, $cookies, discussionFactory){
  var self = this;
  startUp();
  function startUp(){
    discussionFactory.getTopic(function(selectedTopic){
      self.topic = selectedTopic;
      self.topicUser = self.topic._user;
    });
  }
// need to re-update the post from the back-end (use the populate?)
  self.createPost = function(){
    discussionFactory.postPost(self.postContent, function(returnedData){
      // self.topic = returnedData.data.topic;
      startUp();
    });
  }
}
