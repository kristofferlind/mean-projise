angular.module('projiSeApp').factory('StoryProvider', function($http, socket, Sprint, $timeout) {
    'use strict';

    var tries = 0,
        backlog = $http.get('/api/stories').success(function(stories) {
                    StoryProvider.backlog.length = 0;
                    angular.copy(stories, StoryProvider.backlog);
                    socket.syncUpdates('story', StoryProvider.backlog);
                }),
        sprintBacklog = function() {
            StoryProvider.sprint = Sprint.activeSprint();
            if (StoryProvider.sprint) {
                return $http.get('/api/stories/' + StoryProvider.sprint._id).success(function(stories) {
                    StoryProvider.sprintBacklog.length = 0;
                    angular.copy(stories, StoryProvider.sprintBacklog);
                    socket.syncUpdates('story', StoryProvider.sprintBacklog);
                });
            } else {
                if (tries >= 10) {
                    return;
                }
                else {
                    tries += 1;
                    $timeout(function() {
                        sprintBacklog();
                    }, 50);
                }
            }
        },
        StoryProvider = {
            promiseBacklog: backlog,
            promiseSprintBacklog: sprintBacklog,
            backlog: [],
            sprintBacklog: [],
            sprintId: '',
            sprint: ''
        };

    return StoryProvider;
});
