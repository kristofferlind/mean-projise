angular.module('projiSeApp').factory('StoryProvider', function($http, socket, Sprint, $timeout) {
    'use strict';

    var tries = 0,
        backlog = $http.get('/api/stories').success(function(stories) {
                    StoryProvider.backlog.length = 0;
                    angular.copy(stories, StoryProvider.backlog);
                    socket.syncUpdates('story', StoryProvider.backlog);
                }),
        sprintBacklog = function() {
            if (StoryProvider.sprintId) {
                return $http.get('/api/stories/' + StoryProvider.sprintId).success(function(stories) {
                    StoryProvider.sprintBacklog.length = 0;
                    angular.copy(stories, StoryProvider.sprintBacklog);
                    socket.syncUpdates('story', StoryProvider.sprintBacklog, true);
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
            sprintId: Sprint.activeSprintId,
            sprint: Sprint.activeSprint()
        };

    sprintBacklog();

    return StoryProvider;
});
