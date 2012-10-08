var reportingManager = angular.module('reportingManager', []);

reportingManager.controller('AppCtrl', function ($scope) {
    if (localStorage['gh-username']) {
        $scope.username = localStorage['gh-username'];
    }
    else {
        localStorage['gh-username'] = $scope.username = 'vibhor86';
    }

    reportingManager.getUserName = function () {
        return $scope.username;
    }

    function saveGithubUser(){

    }
});

