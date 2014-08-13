angular.module('projiSeApp').factory('Project', function($http, $modal, $timeout, $rootScope, ProjectProvider, Session) {
    'use strict';

    var _user = Session.user(),
        _projects = ProjectProvider.projects,
        _activeProject,
        _activeProjectId,
        Project = {
            activeProject: function() {
                if (!_activeProject) {
                    return Project.find(_user.activeProject);
                }
                return _activeProject;
            },
            activeProjectId: function() {
                if (!_activeProjectId) {
                    return _user.activeProject;
                }
                return _activeProjectId;
            },
            activate: function(project) {
                _activeProjectId = project._id;
                _activeProject = project;
                $http.put('/api/projects/' + project._id + '/active');
            },

            all: function() {
                return _projects;
            },
            create: function() {
                var createModal = $modal.open({
                    templateUrl: 'app/manage/projects/create/create.html',
                    controller: 'projectCreateController'
                });

                createModal.result.then(function(project) {
                    $http.post('/api/projects', {
                        name: project.name,
                        description: project.description,
                        users: [_user._id]
                    });
                });
            },
            delete: function(project) {
                $http.delete('/api/projects/' + project._id);
            },
            find: function(projectId) {
                var _project = {};

                _project = _.find(_projects, {
                    _id: projectId
                });

                return _project;
            },
            update: function(project) {
                var editModal = $modal.open({
                    templateUrl: 'app/manage/projects/edit/edit.html',
                    controller: 'projectEditController',
                    resolve: {
                        project: function() {
                            return project;
                        }
                    }
                });

                editModal.result.then(function(project) {
                    $http.put('/api/projects/' + project._id, project);
                });

            },
            Users: {
                add: function() {
                    var addUserModal = $modal.open({
                        templateUrl: 'app/manage/projects/users/add/add.html',
                        controller: 'projectAddUserController'
                    });

                    addUserModal.result.then(function(user) {
                        $http.put('/api/projects/' + Project.activeProjectId() + '/users/', user);
                    });
                },
                all: function() {
                    if (_activeProject) {
                        return _activeProject.users;
                    }
                },
                remove: function(user) {
                    $http.delete('/api/projects/' + Project.activeProjectId() + '/users/' + user._id);
                }
            },
            Teams: {
                add: function(team) {
                    $http.put('/api/projects/' + Project.activeProjectId() + '/users/' + team._id);
                }
            },
            Sprints: {
                all: function() {
                    return Project.activeProject().sprints;
                }
            }
        };

    $rootScope.$watch(function() {
        var project = Project.find(Project.activeProjectId());
        return project;
    }, function() {
        var projectId = Project.activeProjectId(),
            project = Project.find(projectId);

        _activeProject = angular.copy(project);
    }, true);

    return Project;
});
