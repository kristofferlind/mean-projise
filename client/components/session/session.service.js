angular.module('projiSeApp').factory('Session', function($http, socket) {
    'use strict';

    var promise = $http.get('/api/users/me').success(function(user) {
            angular.copy(user, _user);
            socket.syncUpdates('user', _user);
        }),
        _user = {
            name: {}
        },
        Session = {
            promise: promise,
            user: function() {
                return _user;
            },
        };

    return Session;
});
