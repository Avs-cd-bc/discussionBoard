angular.module("app", ["ngRoute", "ngCookies"]);

angular.module("app").config(function($routeProvider){
  $routeProvider.when("/login", {
    templateUrl: "partials/login.html",
    controller: "loginController",
    controllerAs: "LC"
  })
  .when("/dashboard", {
    templateUrl: "partials/dashboard.html",
    controller: "dashboardController",
    controllerAs: "DC"
  })
  .when("/topic",{
    templateUrl: "partials/topic.html",
    controller: "topicController",
    controllerAs: "TC"
  })
  .when("/user",{
    templateUrl: "partials/user.html",
    controller: "userController",
    controllerAs: "UC"
  })
  .otherwise("/login");
});
