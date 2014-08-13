angular.module('projiSeApp')
    .controller('StoryController', function($scope, Story, Task) {
        'use strict';

        $scope.filter = {
            sbStatus: 'not started'
        };

        $scope.Story = Story;
        $scope.Task = Task;
    });
