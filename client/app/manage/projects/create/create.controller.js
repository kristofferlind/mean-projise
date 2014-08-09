angular.module('projiSeApp')
    .controller('projectCreateController', function($scope, $modalInstance) {
        'use strict';

        $scope.newProject = {};

        $scope.create = function() {
            $modalInstance.close($scope.newProject);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
