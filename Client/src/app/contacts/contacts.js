angular.module('contacts', [])
.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('contacts', {
            url: '/contacts',
            templateUrl: 'contacts\contacts.tpl.html',
            controller: 'ContactsCtrl'

        });
}])
.controller('ContactsCtrl', ['$scope', 'ApiClient', function ($scope, ApiClient) {
    $scope.contacts = {};
    var opts = {
        url : 'api/contacts'
    }
    ApiClient.get(opts, function (data) {
        $scope.contacts = data;
    });
}]);