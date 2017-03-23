angular.module("app").controller("loginController", loginController);

function loginController($location, discussionFactory){
  var self = this;
  this.login = function(){
    discussionFactory.login(self.userName, function(){
      $location.url("/dashboard");
    });
  }
}
