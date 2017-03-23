angular.module("app").controller("dashboardController", dashboardController);

function dashboardController($location, discussionFactory){
  var self = this;
  this.userName = discussionFactory.getUser();
}
