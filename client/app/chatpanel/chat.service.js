angular.module('projiSeApp').factory('Chat', function($http, socket) {
    'use strict';

    $http.get('/api/messages').success(function(messages) {
        Chat.messages = angular.copy(messages);
        socket.syncUpdates('message', Chat.messages);
    });

    var Chat = {
        messages: [],
        sendMessage: function(message) {
            console.log(message);
            $http.post('/api/messages', message);
        }
    };

    return Chat;
});
