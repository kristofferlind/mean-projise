/**
 * @ngdoc service
 * @name  ProjectProvider
 * @description  Manages data for projects (to make sure its loaded and in sync)
 */
angular.module('projiSeApp').factory('ProjectProvider', function($http, socket) {
    'use strict';

    //Make fetching projects a promise so we can check that its done before loading a view that needs it
    var promise = $http.get('/api/projects').success(function(projects) {
            ProjectProvider.projects.length = 0;
            angular.copy(projects, ProjectProvider.projects);

            //Setup sync for projects
            socket.syncUpdates('project', ProjectProvider.projects);
        }),
        ProjectProvider = {
            promise: promise,
            projects: []
        };

    return ProjectProvider;
});
