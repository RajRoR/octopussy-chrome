'use strict';

/* Controllers */

function UserCtrl($scope, $location) {
	$scope.github_password = ""
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

 //angular.module('project', ['Github']);

function ProjectCtrl($scope, $location, $routeParams, GithubRepo) {
	
		if(localStorage["token"])
		  {
			
		  $.ajax({
			  url: "https://api.github.com/user/repos?access_token="+localStorage["token"]
			  }).done(function(ress) { 
				$scope.projects = ress
			});
		  }else
		   {
			 $scope.api = octo.api().token('')
		 	$scope.api.get('/user/repos').on('success',function (res){$scope.projects = res })()
			$.ajax({
			  url: "https://api.github.com/users/"+$routeParams.user+"/repos"
			  }).done(function(ress) { 
				$scope.projects = ress
			});
			}
	       $scope.onSelect = function (name) {
                       // alert(name);
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

function MilestoneCtrl($scope, $location, $routeParams, GithubMilestone) {
  
    self.selectedMilestone = null;
if(localStorage["name"])
	{
   	       if(localStorage["token"])
		    {
		     $.ajax({
			  url: "https://api.github.com/repos/"+localStorage["name"]+"/milestones?access_token="+localStorage["token"]
                                
			  }).done(function(ress) { 
			 	$scope.milestones = ress
                                
			});
		     }
            else
		     {
			$.ajax({
			  url: "https://api.github.com/repos/"+localStorage["name"]+"/milestones"
			  }).done(function(ress) { 
			 	$scope.milestones = ress
			});
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


function TaskCtrl($scope, $location, $routeParams, GithubIssue) {
	if ($routeParams.milestone != null) {
if(localStorage["name"])
{
		if (localStorage["token"]) {
			$.ajax({
				url : "https://api.github.com/repos/" + localStorage["name"] + "/issues?milestone=" + $routeParams.milestone + "&access_token=" + localStorage["token"]

			}).done(function(ress) {
				$scope.issues = ress

			});
		} else {
			$.ajax({
				url : "https://api.github.com/repos/" + localStorage["name"] + "/issues?milestone=" + $routeParams.milestone
			}).done(function(ress) {
				$scope.issues = ress
			});
		}
}
 else
{
$scope.milestones = []
}
		// $scope.issues = GithubIssue.query({user:$routeParams.user, repo:$routeParams.repo, milestone:$routeParams.milestone})
	}
}

