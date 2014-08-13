angular.module('projiSeApp').factory('Story', function($http, $modal, $rootScope, StoryProvider, Sprint, Session, Task) {
    'use strict';

    var _user = Session.user(),
        _sprintId = Sprint.activeSprintId,
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
                    story.status = 'not started';
                    $http.post('/api/stories', story);
                });
            },
            delete: function(story) {
                $http.delete('/api/stories/' + story._id);
            },
            // find: function() {},
            edit: function(story) {
                var editModal = $modal.open({
                    templateUrl: 'app/project/story/edit/edit.html',
                    controller: 'storyEditController',
                    resolve: {
                        story: function() {
                            return story;
                        }
                    }
                });

                editModal.result.then(function(story) {
                    Story.update(story);
                });
            },
            update: function(story) {
                $http.put('/api/stories/' + story._id, story);
            },
            SprintBacklog: {
                add: function(story) {
                    story.sprintId = _sprintId;
                    Story.update(story);
                },
                remove: function(story) {
                    delete story.sprintId;
                    Story.update(story);
                }
            },
            User: {
                setStory: function() {
                    Story.User.story = _.find(_backlog, {userId: _user._id});
                    if(Story.User.story) {
                        Task.setAll(Story.User.story);
                    }
                },
                story: {},
                start: function(story) {
                    // console.log(story.name + ' start');
                    if (story.userId || Story.User.story) {
                        return;
                    }
                    story.status = 'in progress';
                    story.userId = _user._id;
                    Story.update(story);
                    // Task.setAll(story);
                },
                stop: function(story) {
                    // var user = Session.user();
                    // console.log(story.name + ' start');
                    story.status = 'not started';
                    story.userId = undefined;
                    Story.update(story);
                    Task.all.length = 0;
                },
                finish: function(story) {
                    // var user = Session.user();
                    // console.log(story.name + ' start');
                    story.status = 'completed';
                    story.userId = undefined;
                    Story.update(story);
                    Task.all.length = 0;
                }
            }
        };

    Story.User.setStory();

    $rootScope.$watch(function() {
        return _backlog;
    }, function() {
        Story.User.setStory();
    }, true);

    return Story;
});
