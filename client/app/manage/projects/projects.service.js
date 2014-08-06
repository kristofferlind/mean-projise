angular.module('projiSeApp').factory('Project', function($http, socket, User) {
    'use strict';

    var _user = User.current,
        Project = {
            all: function() {
                var _projects = [];

                $http.get('/api/projects').success(function(projects) {
                    _projects.length = 0;
                    angular.copy(projects, _projects);
                    socket.syncUpdates('project', _projects);
                });

                return _projects;
            },
            create: function(project) {
                if (project === '') {
                    return;
                }

                $http.post('/api/projects', {
                    name: project.name,
                    description: project.description,
                    users: [_user._id]
                });
            },
            delete: function(project) {
                $http.delete('/api/projects/' + project._id);
            },
            find: function(projectId) {
                var _project = {};
                $http.get('/api/projects/' + projectId).success(function(project) {
                    angular.copy(project, _project);
                });

                return _project;
            },
            update: function(project) {
                $http.put('/api/projects/' + project._id, project);
            }
        };

    return Project;
});
