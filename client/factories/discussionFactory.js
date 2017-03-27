angular.module("app").factory("discussionFactory", discussionFactory);

function discussionFactory($http){
  var factory = {};
  var db = {};
  var user = {};
  factory.login = function(_userName, callback){
    $http.post("/login", {name: _userName}).then(function(returnedData){
      if(returnedData.data.success){
        user = returnedData.data.user;
      }
      callback(returnedData);
    });
  }
  factory.postTopic = function(content, description, category, callback){
    var newTopic = {
      _user: user.name,
      content,
      description,
      category : category.name
    };

    $http.post("/topic", newTopic).then(function(returnedData){
      callback();
    });
  }
  factory.getUser = function(){
    return user.name;
  }
  factory.index = function(callback){
    $http.get("/index").then(function(returnedData){
      if(returnedData.data.success){
        db.topics = returnedData.data.topics;
        db.categories = returnedData.data.categories;
        callback(db);
      }
    });
  }
  return factory;
}
