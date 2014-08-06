'use strict';

angular.module('projiSeApp')
    .factory('User', function($http, socket, $resource) {
        // return $resource('/api/users/:id/:controller', {
        //     id: '@_id'
        // }, {
        //     changePassword: {
        //         method: 'PUT',
        //         params: {
        //             controller: 'password'
        //         }
        //     },
        //     get: {
        //         method: 'GET',
        //         params: {
        //             id: 'me'
        //         }
        //     }
        // });

        var User = {
            get: $http.get('/api/users/me').success(function(user) {
                // User.current.length = 0;
                angular.copy(user, User.current);
                socket.syncUpdates('user', User.current);
            }),
            current: ''

        };

        return User;
    });
