angular.module("app").factory("discussionFactory", discussionFactory);

function discussionFactory($http){
  var factory = {};
  var userName = "";
  factory.login = function(_userName, callback){
    userName = _userName;
    callback();
  }
  factory.getUser = function(){
    return userName;
  }
  return factory;
}
