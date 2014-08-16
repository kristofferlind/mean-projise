'use strict';

/**
 * @name SettingsCtrl
 * @description Manages account settings view
 * @todo Needs more settings, currently only possible to change password
 */
angular.module('projiSeApp')
    .controller('SettingsCtrl', function($scope, User, Auth) {
        $scope.errors = {};

        $scope.changePassword = function(form) {
            $scope.submitted = true;
            if (form.$valid) {
                Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
                    .then(function() {
                        $scope.message = 'Password successfully changed.';
                    })
                    .catch(function() {
                        form.password.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect password';
                        $scope.message = '';
                    });
            }
        };
    });
