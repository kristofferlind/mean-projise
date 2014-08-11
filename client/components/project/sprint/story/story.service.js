angular.module('projiSeApp').factory('Story', function($http, $modal, StoryProvider) {
    'use strict';

    var _sprintId = StoryProvider.sprintId,
        _backlog = StoryProvider.backlog,
        _sprintBacklog = StoryProvider.sprintBacklog,
        Story = {
            backlog: function() {
                return _backlog;
            },
            sprintBacklog: function() {
                return _sprintBacklog;
            },
            create: function() {
                var createModal = $modal.open({
                    templateUrl: 'app/project/story/create/create.html',
                    controller: 'storyCreateController'
                });

                createModal.result.then(function(story) {
                    $http.post('/api/stories', story);
                });
            },
            delete: function(story) {
                $http.delete('/api/stories/' + story._id);
            },
            // find: function() {},
            update: function(story) {
                var editModal = $modal.open({
                    templateUrl: 'app/project/sprint/edit/edit.html',
                    controller: 'sprintEditController',
                    resolve: {
                        story: function() {
                            return story;
                        }
                    }
                });

                editModal.result.then(function(story) {
                    $http.put('/api/stories/' + story._id, story);
                });
            }
        };

    return Story;
});
