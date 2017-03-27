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
  self.topic = function(_id){
    discussionFactory.topic(_id, function(returnedData){
      console.log(returnedData);
    })
  }

  function index(){
    discussionFactory.index(function(db){
      self.topics = db.topics;
      self.categories = db.categories;
    });
  }
}
