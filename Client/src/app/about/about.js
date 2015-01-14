angular.module('about', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('about', {
            url: '/about',
            templateUrl: 'about\about.tpl.html',
            controller: 'AboutCtrl'

        });
}])
.controller('AboutCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
    //$scope.$root.title = 'AngularJS SPA | About';
    //$scope.$on('$viewContentLoaded', function () {
    //    $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
    //});
}]);