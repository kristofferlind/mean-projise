angular.module('projiSeApp').factory('ProjectProvider', function($http, socket) {
    'use strict';

    var promise = $http.get('/api/projects').success(function(projects) {
            ProjectProvider.projects.length = 0;
            angular.copy(projects, ProjectProvider.projects);
            socket.syncUpdates('project', ProjectProvider.projects);
        }),
        ProjectProvider = {
            promise: promise,
            projects: []
        };

    return ProjectProvider;
});
