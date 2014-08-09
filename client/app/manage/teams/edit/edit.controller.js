angular.module('projiSeApp')
    .controller('teamEditController', function($scope, $modalInstance, team) {
        'use strict';

        $scope.model = {
            editTeam: team
        };

        $scope.update = function() {
            $modalInstance.close($scope.model.team);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
