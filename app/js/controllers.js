'use strict';

/* Controllers */

function UserCtrl($scope, $location) {
    $scope.github_username = 'vibhor86'

    $scope.saveGithubUser = function () {
        $location.path(['', 'github', $scope.github_username, ''].join('/'));
    }
}

angular.module('project', ['Github']);

function ProjectCtrl($scope, $location, $routeParams, GithubRepo) {
    $scope.projects = GithubRepo.query({user:$routeParams.user});

    $scope.onSelect = function () {
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
    $scope.milestones = GithubMilestone.query({user:$routeParams.user, repo:$routeParams.repo})
    self.selectedMilestone = null;

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

    $scope.onSelect = function () {
        $location.path(['', 'github', $routeParams.user, $routeParams.repo, this.milestone.number, ''].join('/'));
    }
}

function TaskCtrl($scope, $location, $routeParams, GithubIssue) {
    if ($routeParams.milestone != null) {
        $scope.issues = GithubIssue.query({user:$routeParams.user, repo:$routeParams.repo, milestone:$routeParams.milestone})
    }
}