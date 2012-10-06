rptMgrApp.controller('ProjectCtrl', function ($scope, $http) {
    $http.get('https://api.github.com/users/vibhor86/repos').success(function(data){
        $scope.projects = data;
    });
});