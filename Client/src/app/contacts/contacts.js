angular.module('contacts', [])
.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('contacts', {
            url: '/contacts',
            templateUrl: 'contacts\contacts.tpl.html',
            controller: 'ContactsCtrl'

        });
}])
.controller('ContactsCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {

}]);