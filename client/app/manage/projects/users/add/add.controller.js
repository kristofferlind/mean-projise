angular.module('projiSeApp')
    .controller('projectAddUserController', function($scope, $modalInstance) {
        'use strict';

        $scope.newUser = {};

        $scope.add = function() {
            $modalInstance.close($scope.newUser);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
