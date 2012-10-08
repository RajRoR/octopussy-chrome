reportingManager.controller('ProjectCtrl', function ($scope, $http) {
    $http.get('https://api.github.com/users/' + reportingManager.getUserName() + '/repos').success(function (data) {
        $scope.projects = data;
    });

    $scope.projects = function(){
        $scope.projects;
    }
});