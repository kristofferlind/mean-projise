angular.module('projiSeApp')
    .controller('ProjectsController', function($scope, Project) {
        'use strict';

        $scope.showEditProject = false;

        $scope.model = {
            projects: Project.all()
        };

        $scope.createProject = function() {
            Project.create($scope.newProject);
            $scope.newProject = '';
        };

        $scope.editProject = function(project) {
            $scope.editProject = Project.find(project._id);
            $scope.showEditProject = true;
        };

        $scope.updateProject = function() {
            Project.update($scope.editProject);
            $scope.editProject = '';
            $scope.showEditProject = false;
        };

        $scope.deleteProject = function(project) {
            Project.delete(project);
        };
    });
