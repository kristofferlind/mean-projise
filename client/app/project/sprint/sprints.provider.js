angular.module('projiSeApp').factory('SprintProvider', function($http, socket) {
    'use strict';

    var promise = $http.get('/api/sprints').success(function(sprints) {
            SprintProvider.sprints.length = 0;
            angular.copy(sprints, SprintProvider.sprints);
            socket.syncUpdates('sprint', SprintProvider.sprints);
        }),
        SprintProvider = {
            promise: promise,
            sprints: []
        };

    return SprintProvider;
});
