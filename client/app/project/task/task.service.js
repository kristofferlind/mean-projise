angular.module('projiSeApp').factory('Task', function($http, $modal, socket) {
    'use strict';

    var _story = {},
        Task = {
        all: [],
        setAll: function(story) {
            _story = story;
            $http.get('/api/tasks/' + story._id).success(function(tasks) {
                Task.all = angular.copy(tasks);
                socket.syncUpdates('task', Task.all);
            });
        },
        create: function(task) {
            task.isDone = false;
            task.storyId = _story._id;
            $http.post('/api/tasks', task);
        },
        delete: function(task) {
            $http.delete('/api/tasks/' + task._id);
        },
        edit: function(task) {
            var editModal = $modal.open({
                    templateUrl: 'app/project/task/edit/edit.html',
                    controller: 'taskEditController',
                    resolve: {
                        task: function() {
                            return task;
                        }
                    }
                });

            editModal.result.then(function(task) {
                Task.update(task);
            });
        },
        update: function(task) {
            $http.put('/api/tasks/' + task._id, task);
        }
    };

    return Task;
});
