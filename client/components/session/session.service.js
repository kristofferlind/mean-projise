angular.module('projiSeApp').factory('Session', function($http, socket, User) {
    'use strict';

    // var _user = {};

    // User.promise().success(function(user) {
    //     Session.user = user;
    // });

    var Session = {
        promise: User.get,
        user: User.current
    };

    return Session;
});
