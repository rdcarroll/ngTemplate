'use strict';

// Declares how the application should be bootstrapped. See: http://docs.angularjs.org/guide/module
angular.module('app',
    [
        'ui.router',
        'app.filters',
        'app.services',
        'app.directives',
        'home',
        'about',
        'contacts'
    ])
    // Gets executed during the provider registrations and configuration phase. Only providers and constants can be
    // injected here. This is to prevent accidental instantiation of services before they have been fully configured.
    .config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

        // UI States, URL Routing & Mapping. For more info see: https://github.com/angular-ui/ui-router
        // ------------------------------------------------------------------------------------------------------------

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home\Home.tpl.html',
                controller: 'HomeCtrl'

            })
            .state('contacts', {
                url: '/contacts',
                templateUrl: 'contacts\contacts.tpl.html',
                controller: 'ContactsCtrl'
            })
            //.state('login', {
            //    url: '/login',
            //    templateUrl: 'home/home.tpl.html',
            //    controller: 'LoginCtrl'
            //})
            .state('otherwise', {
                url: '*path',
                templateurl: 'home\home.tpl.html',
                controller: 'error404ctrl'
            });

        $locationProvider.html5Mode(true);

    }])

    // Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
    // can be injected here. This is to prevent further system configuration during application run time.
    .run(['$templateCache', '$rootScope', '$state', '$stateParams', function ($templateCache, $rootScope, $state, $stateParams) {
     
        //// Allows to retrieve UI Router state information from inside templates
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {

            // Sets the layout name, which can be used to display different layouts (header, footer etc.)
            // based on which page the user is located
            $rootScope.layout = toState.layout;
        });
    }]);