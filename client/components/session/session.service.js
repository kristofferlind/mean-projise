angular.module('projiSeApp').factory('Session', function($http, socket, User) {
    'use strict';

    var Session = {
        user: User.get()
    };

    return Session;
});
