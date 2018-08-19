var myApp = angular.module('myApp', ['ngRoute']);

var appControllers=angular.module('appControllers',[]);

myApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
    $routeProvider.
    when('/home', {
        templateUrl: "assets/views/routes/home.html",
        controller: "HomeController"
    }).
    when('/causes', {
        templateUrl: "/assets/views/routes/causes.html",
        controller: "CausesController"
    }).
    when('/process', {
        templateUrl: "/assets/views/routes/process.html",
        controller: "ProcessController"
    }).
    when('/about', {
        templateUrl: "/assets/views/routes/about.html",
        controller: "AboutController"
    }).
    when('/services', {
        templateUrl: "/assets/views/routes/services.html",
        controller: "ServicesController"
    }).
    otherwise({
        redirectTo: "/home"
    });

    $locationProvider.html5Mode(true);

}]);
