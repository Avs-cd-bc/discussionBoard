angular.module("app").controller("dashboardController", dashboardController);

function dashboardController($location, discussionFactory){
  var self = this;
  self.userName = discussionFactory.getUser();
  index();

  self.newTopic = function(){
    discussionFactory.postTopic(self.content, self.description, self.category, function(){
      index();
    });
  }

  function index(){
    discussionFactory.index(function(db){
      self.topics = db.topics;
      self.categories = db.categories;
    });
  }
}
