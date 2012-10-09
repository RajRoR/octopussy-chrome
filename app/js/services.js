'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.


angular.module('Github', ['ngResource']).
    factory('GithubRepo', function ($resource) {
        var project = $resource('https://api.github.com/users/:user/repos');
        return project;
    }).
    factory('GithubMilestone', function ($resource) {
        var milestones = $resource('https://api.github.com/repos/:user/:repo/milestones');
        return milestones;
    }).
    factory('GithubIssue', function ($resource) {
        var issues = $resource('https://api.github.com/repos/:user/:repo/issues?milestone=:milestone');
        return issues;
    });

angular.module('reportingManagerApp.services', ['Github']).
    value('version', '0.1');
