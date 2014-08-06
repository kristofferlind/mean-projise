angular.module('projiSeApp').factory('TeamProvider', function($http, socket) {
    'use strict';

    var promise = $http.get('/api/teams').success(function(teams) {
            TeamProvider.teams.length = 0;
            angular.copy(teams, TeamProvider.teams);
            socket.syncUpdates('team', TeamProvider.teams);
        }),
        TeamProvider = {
            promise: promise,
            teams: []
        };

    return TeamProvider;
});
