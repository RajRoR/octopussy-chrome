'use strict';


// Declare app level module which depends on filters, and services
angular.module('reportingManagerApp', ['reportingManagerApp.filters', 'reportingManagerApp.services', 'reportingManagerApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: ProjectCtrl});
    $routeProvider.otherwise({redirectTo: '/dashboard'});
  }]);

angular.module('project',['githubServices']);