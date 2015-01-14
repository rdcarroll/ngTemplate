
// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('app.services', [])

    .value('version', '0.1')

    .factory('ApiClient', ['$http', function ($http) {
        return {
            get: function (opts, cb) {
                $http.get(opts.url).success(function (data) {
                    cb(data);
                });
            }
        }

    }]);