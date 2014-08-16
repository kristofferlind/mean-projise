'use strict';
//account.js
/**
 * @name account.js
 * @description Manages routes for account states(pages)
 */
angular.module('projiSeApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    'main': {
                        templateUrl: 'app/account/login/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            .state('signup', {
                url: '/signup',
                views: {
                    'main': {
                        templateUrl: 'app/account/signup/signup.html',
                        controller: 'SignupCtrl',
                    }
                }
            })
            .state('dashboard.settings', {
                url: '/settings',
                authenticate: true,
                views: {
                    'main@': {
                        templateUrl: 'app/account/settings/settings.html',
                        controller: 'SettingsCtrl',
                    }
                }
            });
    });
