'use strict';

// login.controller.js
/**
 * @name LoginCtrl
 * @description Handles logic for login view.
 * @todo Sometimes login doesn't redirect
 */
angular.module('projiSeApp')
    .controller('LoginCtrl', function($scope, Auth, $location, $window) {
        $scope.user = {};
        $scope.errors = {};

        /**
         * @name $scope.login
         * @description Logic for logging in
         * @param formdata, for authenticating user
         */

        $scope.login = function(form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                    .then(function() {
                        // Logged in, redirect to home
                        $location.path('/');
                    })
                    .catch(function(err) {
                        $scope.errors.other = err.message;
                    });
            }
        };

        /**
         * @name $scope.loginOauth
         * @description Oauth authentication
         * @param Oauth provider
         */
        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };
    });
