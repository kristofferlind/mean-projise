angular.module('projiSeApp').factory('Session', function($http, socket) {
    'use strict';

    var promise = $http.get('/api/users/me').success(function(user) {
            angular.copy(user, _user);
            socket.syncUpdates('user', _user);

            // $http.get('/api/projects/' + user.activeProject).success(function(project) {
            //     angular.copy(project, _project);
            //     socket.syncUpdates('project', _project);
            // });
        }),
        _user = {},
        // _project = {},
        Session = {
            promise: promise,
            user: function() {
                return _user;
            },
            // project: function() {
            //     return _project;
            // }
        };

    return Session;
});
