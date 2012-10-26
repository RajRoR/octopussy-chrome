'use strict';


// Declare app level module which depends on filters, and services
angular.module('reportingManagerApp', ['reportingManagerApp.filters', 'reportingManagerApp.services', 'reportingManagerApp.directives','SharedServices']).
    config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {templateUrl:'partials/login.html', controller:UserCtrl})
    $routeProvider.when('/github/:user', {templateUrl:'partials/dashboard.html', controller:ProjectCtrl});
    $routeProvider.when('/github/:user/:repo', {templateUrl:'partials/miles.html', controller:MilestoneCtrl});
    //$routeProvider.when('/github/:user/:repo/:milestone', {templateUrl:'partials/dashboard.html', controller:TaskCtrl});     $routeProvider.when('/github/:user/:repo/:milestone', {templateUrl:'partials/task.html', controller:TaskCtrl});
    $routeProvider.otherwise({redirectTo:'/'});
}]);

angular.module('project', ['githubServices']);

