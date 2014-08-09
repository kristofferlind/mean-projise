'use strict';

angular.module('projiSeApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('dashboard.manage', {
                url: '',
                abstract: true
            })
            .state('dashboard.manage.projects', {
                url: '/',
                authenticate: true,
                resolve: {
                    resolvedProjectProvider: function(ProjectProvider) {
                        return ProjectProvider.promise;
                    }
                },
                views: {
                    'main@': {
                        templateUrl: 'app/manage/projects/projects.html',
                        controller: 'ProjectsController'
                    }
                }
            })
            .state('dashboard.manage.teams', {
                url: '/teams',
                authenticate: true,
                resolve: {
                    resolvedTeamProvider: function(TeamProvider) {
                        return TeamProvider.promise;
                    }
                },
                views: {
                    'main@': {
                        templateUrl: 'app/manage/teams/teams.html',
                        controller: 'TeamsController'
                    }
                }
            });
    });
