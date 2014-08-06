'use strict';

angular.module('projiSeApp')
    .controller('TeamsController', function($scope, Team) {

        $scope.showEditTeam = false;

        $scope.model = {
            teams: Team.all(),
            newTeam: '',
            editTeam: '',
            newUser: '',
            activeTeam: Team.active(),
            users: Team.Users.all(),
        };

        $scope.activateTeam = function(team) {
            Team.activate(team);
        };

        $scope.createTeam = function() {
            Team.create($scope.model.newTeam);
            $scope.model.newTeam = '';
        };

        $scope.editTeam = function(team) {
            $scope.model.editTeam = Team.find(team._id);
            $scope.showEditTeam = true;
        };

        $scope.updateTeam = function() {
            Team.update($scope.model.editTeam);
            $scope.showEditTeam = false;
        };

        $scope.deleteTeam = function(team) {
            Team.delete(team);
        };

        $scope.addUser = function() {
            Team.Users.add($scope.model.newUser);
        };
    });
