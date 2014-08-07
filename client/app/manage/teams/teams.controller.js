'use strict';

angular.module('projiSeApp')
    .controller('TeamsController', function($scope, Team, Session) {

        $scope.showEditTeam = false;

        $scope.model = {
            teams: Team.all(),
            newTeam: '',
            editTeam: '',
            newUser: '',
            users: Team.Users.all(),
            user: Session.user(),
            // team: Team.find($scope.model.user.activeTeam)
        };

        $scope.$watch('model.user.activeTeam', function() {
            $scope.model.users = Team.Users.all();
        });

        $scope.activateTeam = function(team) {
            Team.activate(team);
            $scope.model.team = Team.find($scope.model.user.activeTeam);
        };

        $scope.createTeam = function() {
            Team.create($scope.model.newTeam);
            $scope.model.newTeam = '';
        };

        $scope.editTeam = function(team) {
            $scope.model.editTeam = team;
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
