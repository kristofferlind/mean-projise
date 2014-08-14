angular.module('projiSeApp')
    .controller('OverviewController', function($scope, Idea) {
        'use strict';

        $scope.Idea = Idea;
    });
