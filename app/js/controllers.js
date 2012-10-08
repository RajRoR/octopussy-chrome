'use strict';

/* Controllers */
function UserCtrl($scope, $http) {
    $scope.github_username = $scope.github_username || 'vibhor86'

    $scope.saveGithubUser = function(){
        $scope.github_username = $scope.github_username
    }
}

function ProjectCtrl($scope, GithubRepo) {
    $scope.projects = GithubRepo.query({user: $scope.github_username});
}