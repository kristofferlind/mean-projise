
/**
 * @ngdoc object
 * @name LoginCtrl
 * @requires $scope
 * @requires Auth
 * @requires $location
 * @requires $window
 * @todo Sometimes login doesn't redirect
 * @description Handles logic for login view.
 */
angular.module('projiSeApp')
    .controller('LoginCtrl', function($scope, Auth, $location, $window) {
        'use strict';

        $scope.user = {};
        $scope.errors = {};

        /**
         * @ngdoc function
         * @name $scope.login
         * @param formdata, for authenticating user
         * @description Logic for logging in
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
         * @ngdoc function
         * @name $scope.loginOauth
         * @param Oauth provider
         * @description Oauth authentication
         */
        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };
    });
