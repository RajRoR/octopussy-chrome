'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.


angular.module('Github', ['ngResource']).
    factory('GithubRepo', function ($resource) {
        var Project = $resource('https://api.github.com/users/:user/repos');
        return Project;
    });

angular.module('reportingManagerApp.services', ['Github']).
    value('version', '0.1');
