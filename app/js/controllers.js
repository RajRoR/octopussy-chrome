'use strict';

/* Controllers */

	function UserCtrl($scope, $location,GithubRepo) {
		$scope.saveGithubUser = function () {
			$scope.github_username = document.login.github_username.value;
			$scope.github_password = document.login.github_password.value;
			if($scope.github_username && $scope.github_password) 
				{
					$scope.api = octo.api().username($scope.github_username).password($scope.github_password);
					$scope.api.post('/authorizations', {note: 'my script', scopes: ['repo']})
					  .on('success', function(res){
						localStorage["token"] =  res.body.token;
						localStorage["user"] =  $scope.github_username;
						$location.path(['', 'github', $scope.github_username, ].join('/'));
						$scope.$apply();
					  })
					 .on('error',function(res){
						$('.alert').show();
						$('.message').append("Unauthorised");
					    })();
			      }
			 else if($scope.github_password == "" )
				  {	    localStorage["token"] =  "";
						localStorage["user"] =  $scope.github_username;
						$location.path(['', 'github', $scope.github_username, ].join('/'));	
				  } 
			}

			$scope.removeGithubUser = function () {
				localStorage["owner"]="";
				localStorage["name"]=""	;
				localStorage["user"] = "";
				$location.path([''].join('/'));
			}
			
			$scope.removemessage = function () {
				$('.alert').hide();
				$('.message').empty();
			}

			$scope.cleardata= function (){
				$('#fav .Unfavorite').remove();
				$('#unfav .Favorite').remove();
			}	
			$scope.checkUser= function (){
				if (localStorage["user"]) {
					return "yes"
				 }
				else
				{
				   	return "no"
				}		
			}
			$scope.getUser= function (){
				return localStorage["user"]		
			}
			$scope.onSelectTeam = function (){
				$location.path(['', 'github_team'].join('/'));			
			}
			$scope.trim = function (name){
				if(name.length > 10)
				{
					return	name.substring(0,10) + "...";		
				}
				else
				{
					return name
				}
			}
	}

	angular.module('project', ['Github']);


	function ProjectCtrl($scope, $location, $routeParams, GithubRepo, GithubRepo2, GithubRepo3) {
	
		$scope.data = null
	
		if (!localStorage["user"]) {
			$location.path([''].join('/'));
		}
	
		if (localStorage["token"]) {
			$scope.projects = GithubRepo.query({
				access_token : localStorage["token"]
			});
		} else {
			$scope.projects = GithubRepo2.query({
				user : $routeParams.user
			});
		}
	var counts = 0 
	$scope.projectcall = function(project) {
		alert(project)
		counts = counts + 1
		$('h1').html(counts)
			alert(projects)
			
		}
	
		$scope.onSelect = function(owner, name) {
			localStorage["owner"] = owner;
			localStorage["name"] = name;
			$location.path(['', 'github', $routeParams.user, name, ''].join('/'));
		}
		$scope.getdata = function(project) {
			$scope.callobrator = GithubRepo3.query({
				user : project.owner.login,
				repo : project.name
			})
			return $scope.callobrator;
		}
	
		$scope.getId = function(name) {
			return name;
		}
	
		$scope.getdataofdata = function(project, name) {
			$scope.data = ""
			var count = $('.' + name).attr('data-count')
			$('.' + name).empty()
			_.each(project, function(data) {
					$('.' + name).attr('data-count', "true");
					$('.' + name).append("<img src = '" + data.avatar_url + "' title ='" + data.login + "'  class = 'collaborators-small img-rounded'  alt = 'Collaborator'/>");
				});
			return $scope.data;
		}
	
		$scope.getClass = function(id) {
			if (localStorage[id]) {
				return "Favorite";
			} else {
				return "Unfavorite";
			}
		}
	}


	
	function MilestoneCtrl($scope, $location, $routeParams, GithubMilestone, GithubMilestone2) {
	
		self.selectedMilestone = null;
	
		if (localStorage["name"]) {
			var user = localStorage["owner"];
			var name = localStorage["name"];
			if (localStorage["token"]) {
				$scope.milestones = GithubMilestone.query({
					access_token : localStorage["token"],
					user : user,
					repo : name
				})
			} else {
				$scope.milestones = GithubMilestone2.query({
					user : user,
					repo : name
				})
			}
		} else {
			$scope.milestones = [];
		}
	
		$scope.fetchmilestone = function(project) {
			if (localStorage["token"]) {
				$scope.milestones = GithubMilestone.query({
					access_token : localStorage["token"],
					user : project.owner.login,
					repo : project.name
				})
				return $scope.milestones;
			} else {
				$scope.milestones = GithubMilestone2.query({
					user : project.owner.login,
					repo : project.name
				})
				return $scope.milestones;
			}
		}
	
		$scope.onselectproject = function() {
			$location.path(['', 'github', $routeParams.user, ''].join('/'));
		}
	
		$scope.getClass = function(milestoneId) {
			if (self.selectedMilestone) {
				return self.selectedMilestone.id == milestoneId ? 'active' : '';
			} else {
				return '';
			}
		}
	
		$scope.dueOn = function(milestone) {
			var value = ""
			if (milestone && milestone.due_on) {
				var date = new Date(milestone.due_on)
				value = date.toDateString();
			}
			return value;
		}
	
		$scope.percentCompletion = function(milestone) {
			return milestone.closed_issues / (milestone.closed_issues + milestone.open_issues) * 100;
		}
	
		$scope.health = function(milestones, id) {
			var openIssues = 0;
			var closedIssues = 0;
			var index = 0
			_.each(milestones, function(milestone) {
				index = index + 1
				openIssues += milestone.open_issues;
				closedIssues += milestone.closed_issues;
			});
	
			$('#mil_' + id).text(index + " Milestones");
	
			if (openIssues == 0) {
				return 100;
			} else {
				return closedIssues / (openIssues + closedIssues) * 100;
			}
		}
	
		$scope.onSelectmile = function() {
			$location.path(['', 'github', $routeParams.user, $routeParams.repo, this.milestone.number, ''].join('/'));
		}
	}



	function TaskCtrl($scope, $location, $routeParams, GithubIssue,GithubIssue2) {
		$scope.onselectmilestone = function(){
			$location.path(['', 'github', $routeParams.user, $routeParams.repo, ''].join('/'));
		}
		
		if ($routeParams.milestone != null) {
			if(localStorage["name"])
				{
				if (localStorage["token"]) {
					$scope.issues = GithubIssue.query({user:localStorage["owner"], repo:localStorage["name"], milestone:$routeParams.milestone,access_token:localStorage["token"]});
				} else {
					$scope.issues = GithubIssue2.query({user:localStorage["owner"], repo:localStorage["name"], milestone:$routeParams.milestone});
				}
		}
		 else
		{
		$scope.milestones = [];
		}
			// $scope.issues = GithubIssue.query({user:$routeParams.user, repo:$routeParams.repo, milestone:$routeParams.milestone})
		}
	}

		$(document).on('click','.fav',function(){
			localStorage[$(this).attr('data-id')] = "fav";
			window.location.reload();
		})
		$(document).on('click','.unfav',function(){
			localStorage.removeItem($(this).attr('data-id'));
			window.location.reload();
		})
			

