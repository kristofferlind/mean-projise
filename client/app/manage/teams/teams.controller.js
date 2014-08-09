'use strict';

angular.module('projiSeApp')
    .controller('TeamsController', function($scope, Team) {

        $scope.Team = Team;

        $scope.showEditTeam = false;

        $scope.model = {
            newUser: ''
        };

        $scope.addUser = function() {
            Team.Users.add($scope.model.newUser);
            $scope.model.newUser = '';
        };

    });
