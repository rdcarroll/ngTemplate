angular.module('home', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home\home.tpl.html',
            controller: 'HomeCtrl'

        });
}])

.controller('HomeCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
    $scope.title = "Home Screen";
}]);