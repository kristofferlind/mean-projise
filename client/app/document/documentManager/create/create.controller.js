angular.module('projiSeApp')
    .controller('documentCreateController', function($scope, $modalInstance) {
        'use strict';

        $scope.documentMeta = {};

        $scope.create = function() {
            $modalInstance.close($scope.documentMeta);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
