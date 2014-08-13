angular.module('projiSeApp')
    .controller('SprintController', function($scope, Story) {
        'use strict';

        $scope.filter = {
            status: ''
        };

        $scope.Story = Story;

    });
