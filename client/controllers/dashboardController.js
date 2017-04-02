angular.module("app").controller("dashboardController", dashboardController);

function dashboardController($location, $cookies, discussionFactory){
  var self = this;
  discussionFactory.getUser(function(user){
    self.userName = user.name;
  });
  index();

  self.newTopic = function(){
    discussionFactory.postTopic(self.content, self.description, self.category, function(){
      index();
    });
  }
  self.topic = function(_id){
    discussionFactory.topic(_id, function(returnedData){
      $location.url("/topic");
    });
  }

  function index(){
    discussionFactory.index(function(db){
      self.topics = db.topics;
      self.categories = db.categories;
    });
  }
}
