// angular.module('projiSeApp').factory('Team', function($http, socket, User) {
//     'use strict';

//     var _user = User.get(),
//         Team = {
//             active: function() {
//                 var _active = '';
//                 $http.get('/api/teams/@_id/active').success(function(active) {
//                     angular.copy(active, _active);
//                     socket.syncUpdates('user', _active);
//                 });
//                 return _active;
//             },
//             activate: function(team) {
//                 $http.put('/api/teams/' + team._id + '/active', team);
//             },
//             all: function() {
//                 var _teams = [];

//                 $http.get('/api/teams').success(function(teams) {
//                     _teams.length = 0;
//                     angular.copy(teams, _teams);
//                     socket.syncUpdates('team', _teams);
//                 });

//                 return _teams;
//             },
//             create: function(team) {
//                 if (team === '') {
//                     return;
//                 }

//                 $http.post('/api/teams', {
//                     name: team.name,
//                     description: team.description,
//                     users: [_user._id]
//                 });
//             },
//             delete: function(team) {
//                 $http.delete('/api/teams/' + team._id);
//             },
//             find: function(teamId) {
//                 var _team = {};
//                 $http.get('/api/teams/' + teamId).success(function(team) {
//                     angular.copy(team, _team);
//                     socket.syncUpdates('team', _team);
//                 });

//                 return _team;
//             },
//             update: function(team) {
//                 $http.put('/api/teams/' + team._id, team);
//             },
//             Users: {
//                 add: function(user) {
//                     $http.put('/api/teams/' + _user.activeTeam + '/users', user);
//                 },
//                 all: function() {
//                     var _team = {
//                         users: []
//                     };

//                     console.log(_team);
//                     console.log(_team.users);

//                     $http.get('/api/teams/' + _user.activeTeam + '/users').success(function(users) {
//                         angular.copy(users, _team.users);
//                         socket.syncUpdates('team', _team);
//                     });
//                     return _team.users;
//                 }
//             }
//         };

//     return Team;
// });



angular.module('projiSeApp').factory('Team', function($http, TeamProvider, Session) {
    'use strict';

    var _teams = TeamProvider.teams,
        _user = Session.user(),
        _users = [];

    var Team = {
        active: function() {
            return _user.activeTeam || '';
        },
        activate: function(team) {
            $http.put('/api/teams/' + team._id + '/active', team);
        },
        all: function() {
            return _teams;
        },
        create: function(team) {
            if (team === '') {
                return;
            }

            $http.post('/api/teams', {
                name: team.name,
                description: team.description,
                users: [_user._id]
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
            // var _team = {};
            // $http.get('/api/teams/' + teamId).success(function(team) {
            //     angular.copy(team, _team);
            // });

            // return _team;

            // return $http.get('/api/teams/' + teamId);
        },
        update: function(team) {
            $http.put('/api/teams/' + team._id, team);
        },
        Users: {
            add: function(user) {
                return $http.put('/api/teams/' + _user.activeTeam + '/users', user);
            },
            all: function() {
                // var teamId = Team.active(),
                //     team = Team.find(teamId);

                // return team.users;


                // var _team = {};

                // var users = _team && _team.users;

                // Team.find(Team.active()).success(function(team) {
                //     angular.copy(team, _team);
                //     console.log(team.users);
                // });

                // return users;

                var _users = {};

                $http.get('/api/teams/' + _user.activeTeam + '/users').success(function(users) {
                    angular.copy(users, _users);
                });

                return _users;
            }
        }
    };

    return Team;
});
