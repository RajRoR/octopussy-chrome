

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.


angular.module('Github', ['ngResource']).
    factory('GithubRepo', function ($resource) {
		
        var project = $resource('https://api.github.com/user/repos?access_token=:access_token');
        return project;
    }).
	factory('GithubRepo2', function ($resource) {
	var project = $resource('https://api.github.com/users/:user/repos');
        return project;
    }).
    factory('GithubRepo3', function ($resource) {
	var collaborators = $resource('https://api.github.com/repos/:user/:repo/collaborators');
	return collaborators;
    }).
    factory('GithubMilestone', function ($resource) {
        var milestones = $resource('https://api.github.com/repos/:user/:repo/milestones?access_token=:access_token');
        return milestones;
    }).
    factory('GithubMilestone2', function ($resource) {
        var milestones = $resource('https://api.github.com/repos/:user/:repo/milestones');
        return milestones;
    }).
    factory('GithubIssue', function ($resource) {
        var issues = $resource('https://api.github.com/repos/:user/:repo/issues?milestone=:milestone&access_token=:access_token');
        return issues;
    }).
    factory('GithubIssue2', function ($resource) {
        var issues = $resource('https://api.github.com/repos/:user/:repo/issues?milestone=:milestone');
        return issues;
    }).
   factory('myHttpInterceptor', function ($q, $window) {
        return function (promise) {
            return promise.then(function (response) {
                // do something on success
                // todo hide the spinner
                $('#loading').hide();
                return response;

            }, function (response) {
                // do something on error
                // todo hide the spinner
                $('#loading').hide();
                return $q.reject(response);
            });
        };
    });

angular.module('reportingManagerApp.services', ['Github']).
    value('version', '0.1');
