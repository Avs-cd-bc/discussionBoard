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
  // need to add post population to the partial and controller
  self.createPost = function(){
    discussionFactory.postPost(self.postContent, function(returnedData){
      console.log(returnedData);
    });
  }
}
