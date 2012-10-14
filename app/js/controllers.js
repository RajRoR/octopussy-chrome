'use strict';

/* Controllers */

function UserCtrl($scope, $location) {
	$scope.github_password = ""
	localStorage["owner"]=""
	localStorage["name"]=""	
    $scope.saveGithubUser = function () {
	$scope.github_username = document.login.github_username.value;
	$scope.github_password = document.login.github_password.value;
	if($scope.github_username && $scope.github_password) 
		{
			$scope.api = octo.api().username($scope.github_username).password($scope.github_password);
			$scope.api.post('/authorizations', {note: 'my script', scopes: ['repo']})
		  .on('success', function(res){
			localStorage["token"] =  res.body.token
			$location.path(['', 'github', $scope.github_username, ].join('/'));
			$scope.$apply();
		  })();
        	}
		else if($scope.github_password == "" )
		{	localStorage["token"] =  ""
			$location.path(['', 'github', $scope.github_username, ].join('/'));	
			$scope.$apply();
		} 
 	
	}
}

angular.module('SharedServices', [])
    .config(function ($httpProvider) {
        $httpProvider.responseInterceptors.push('myHttpInterceptor');
        var spinnerFunction = function (data, headersGetter) {
            // todo start the spinner here
            $('#loading').show();
            return data;
        };
        $httpProvider.defaults.transformRequest.push(spinnerFunction);
    })


 angular.module('project', ['Github']);

function ProjectCtrl($scope, $location, $routeParams, GithubRepo,GithubRepo2) {
		$scope.projects = GithubRepo.query({access_token:localStorage["token"]})

		if(localStorage["token"])
		  {
			$scope.projects = GithubRepo.query({access_token:localStorage["token"]})

		
		  }else
		   {
			alert($routeParams.user)
			$scope.projects = GithubRepo2.query({user:$routeParams.user})

		
			}
	       $scope.onSelect = function (owner,name) {
                       // alert(name);
			localStorage["owner"] = ""
			localStorage["owner"] =  owner
 			localStorage["name"] = ""
			localStorage["name"] =  name
			$location.path(['', 'github', $routeParams.user, this.project.name, ''].join('/'));
    		}

    $scope.getClass = function (projectName) {
        if ($routeParams.repo) {
            return $routeParams.repo == projectName ? 'active' : '';
        }
        else {
            return '';
        }
    }
}

function MilestoneCtrl($scope, $location, $routeParams, GithubMilestone,GithubMilestone2) {
  
    self.selectedMilestone = null;
if(localStorage["name"])
	{
	var user = localStorage["owner"]
	var name = localStorage["name"]
   	       if(localStorage["token"])

		    {
			
			$scope.milestones = GithubMilestone.query({access_token:localStorage["token"],user:user,repo:name })
		     
		     }
            else
		     {
			$scope.milestones = GithubMilestone2.query({user:user,repo:name})
			
			}
} else
{
$scope.milestones = []
}

   $scope.getClass = function (milestoneId) {
        if (self.selectedMilestone) {
            return self.selectedMilestone.id == milestoneId ? 'active' : '';
        }
        else {
            return '';
        }
    }

    $scope.dueOn = function (milestone) {
        var value = ""
        if (milestone && milestone.due_on) {
            var date = new Date(milestone.due_on)
            value = date.toDateString();
        }
        return value;
    }

    $scope.percentCompletion = function (milestone) {
        return milestone.closed_issues / (milestone.closed_issues + milestone.open_issues) * 100;
    }

    $scope.health = function () {
        var openIssues = 0;
        var closedIssues = 0;
        _.each($scope.milestones, function (milestone) {
            openIssues += milestone.open_issues;
            closedIssues += milestone.closed_issues;
        });

        if (openIssues == 0) {
            return 100;
        } else {
            return closedIssues / (openIssues + closedIssues) * 100;
        }
    }

    
	$scope.onSelect = function() {
		$location.path(['', 'github', $routeParams.user, $routeParams.repo, this.milestone.number, ''].join('/'));
	}

}


function TaskCtrl($scope, $location, $routeParams, GithubIssue,GithubIssue2) {
	if ($routeParams.milestone != null) {
if(localStorage["name"])
{
		if (localStorage["token"]) {
			$scope.issues = GithubIssue.query({user:localStorage["owner"], repo:localStorage["name"], milestone:$routeParams.milestone,access_token:localStorage["token"]})
			
		} else {
			$scope.issues = GithubIssue2.query({user:localStorage["owner"], repo:localStorage["name"], milestone:$routeParams.milestone})
			
		}
}
 else
{
$scope.milestones = []
}
		// $scope.issues = GithubIssue.query({user:$routeParams.user, repo:$routeParams.repo, milestone:$routeParams.milestone})
	}
}

