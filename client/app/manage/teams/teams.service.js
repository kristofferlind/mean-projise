angular.module('projiSeApp').factory('Team', function($http, $rootScope, TeamProvider, Session, $modal) {
    'use strict';

    var _teams = TeamProvider.teams,
        _user = Session.user(),
        _users = {};

    var Team = {
        active: function() {
            return _user.activeTeam;
        },
        activate: function(team) {
            $http.put('/api/teams/' + team._id + '/active', team);
        },
        activeTeam: function() {
            return Team.find(Team.active());
        },
        all: function() {
            return _teams;
        },
        create: function() {
            var createModal = $modal.open({
                templateUrl: 'app/manage/teams/create/create.html',
                controller: 'teamCreateController'
            });

            createModal.result.then(function(team) {
                $http.post('/api/teams', {
                    name: team.name,
                    description: team.description,
                    users: [_user._id]
                });
            });
        },
        delete: function(team) {
            $http.delete('/api/teams/' + team._id);
        },
        find: function(teamId) {
            var _team = {};

            _team = _.find(_teams, {
                _id: teamId
            });

            return _team;
        },
        update: function(team) {
            var editModal = $modal.open({
                templateUrl: 'app/manage/teams/edit/edit.html',
                controller: 'teamEditController',
                resolve: {
                    team: function() {
                        return team;
                    }
                }
            });

            editModal.result.then(function(team) {
                $http.put('/api/teams/' + team._id, team);
            });
        },
        Users: {
            add: function(user) {
                return $http.put('/api/teams/' + _user.activeTeam + '/users', user);
            },
            all: function() {
                return _users;
            },
            setAll: function() {
                var teamId = Team.active(),
                    team = Team.find(teamId);
                if (team) {
                    _users = angular.copy(team.users);
                }
            },
            remove: function(user) {
                $http.delete('/api/teams/' + user._id + '/users');
            }
        }
    };

    $rootScope.$watch(function() {
        var team = Team.activeTeam();
        if (team) {
            return team.users;
        }
    }, function() {
        var team = Team.activeTeam();
        if (team && team.users) {
            _users = angular.copy(team.users);
        }
    }, true);


    return Team;
});
