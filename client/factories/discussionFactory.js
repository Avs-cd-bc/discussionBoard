angular.module("app").factory("discussionFactory", discussionFactory);

function discussionFactory($http, $cookies){
  var factory = {};
  var db = {};
  var user = {};
  factory.login = function(_userName, callback){
    $http.post("/login", {name: _userName}).then(function(returnedData){
      if(returnedData.data.success){
        var cookieExpire = new Date();
        cookieExpire.setHours(cookieExpire.getHours() + 24);
        $cookies.putObject("user", returnedData.data.user, {expires : cookieExpire})
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
  factory.topic = function(_id, callback){
    $http.post("/topicFull", {_id}).then(function(returnedData){
      callback(returnedData);
    });
  }
  factory.getUser = function(callback){
    callback($cookies.getObject("user"));
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
