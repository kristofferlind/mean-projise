/*
    Directive: storyItem
    Description: Template and logic for story item
*/

angular.module('projiSeApp')

.directive('storyItem', function() {
    'use strict';
    // Runs during compile
    return {
        scope: {
            story: '=ngModel'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function($scope, $rootScope, $attrs, Sprint) {
            //Check that drag-type is pb, that sprintId exists on story and compare its sprintId with current sprintId
            if ($attrs.dragType === 'pb' && $scope.story.sprintId && $scope.story.sprintId === Sprint.activeSprintId) {
                //Set activeSprint to 'story-in-sprint', which is then added as a css class.
                //This class provides styling for story that is already in sprint backlog
                $scope.activeSprint = 'story-in-sprint';
            }
        },
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'app/project/story/storyItem.partial.html',
        transclude: true,
    };
});
