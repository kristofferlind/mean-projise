angular.module('projiSeApp')
    .controller('ProjectController', function($scope, Sprint, Story) {
        'use strict';

        $scope.Sprint = Sprint;
        $scope.Story = Story;
    });
