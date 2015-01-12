'use strict';

// Declares how the application should be bootstrapped. See: http://docs.angularjs.org/guide/module
angular.module('app', ['ui.router', 'app.filters', 'app.services', 'app.directives', 'app.controllers'])

    // Gets executed during the provider registrations and configuration phase. Only providers and constants can be
    // injected here. This is to prevent accidental instantiation of services before they have been fully configured.
    .config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

        // UI States, URL Routing & Mapping. For more info see: https://github.com/angular-ui/ui-router
        // ------------------------------------------------------------------------------------------------------------

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/client/src/app/home/home.tpl.html',
                controller: 'HomeCtrl'

            })
            .state('contacts', {
                url: '/contacts',
                    templateUrl: '/client/src/app/about/about.tpl.html',
                controller: 'AboutCtrl'
        })
            .state('login', {
                url: '/login',
                    templateUrl: '/client/src/app/home/home.tpl.html',
                controller: 'LoginCtrl'
            })
            .state('otherwise', {
                url: '*path',
                    templateUrl: '/client/src/app/home/home.tpl.html',
                controller: 'Error404Ctrl'
            });

        $locationProvider.html5Mode(true);

    }])

    // Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
    // can be injected here. This is to prevent further system configuration during application run time.
    .run(['$templateCache', '$rootScope', '$state', '$stateParams', function ($templateCache, $rootScope, $state, $stateParams) {

    }]);