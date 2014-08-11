angular.module('projiSeApp')
    .controller('sprintCreateController', function($scope, $modalInstance) {
        'use strict';

        $scope.sprint = {};

        $scope.create = function() {
            $modalInstance.close($scope.sprint);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
