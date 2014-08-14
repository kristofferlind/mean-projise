'use strict';

angular.module('projiSeApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('dashboard.project', {
                url: '',
                abstract: true,
                resolve: {
                    resolvedProjectProvider: function(ProjectProvider) {
                        return ProjectProvider.promise;
                    },
                    resolvedSprintProvider: function(SprintProvider) {
                        return SprintProvider.promise;
                    }
                }
            })
            .state('dashboard.project.overview', {
                url: '/overview',
                authenticate: true,
                resolve: {
                    // resolvedProjectProvider: function(ProjectProvider) {
                    //     return ProjectProvider.promise;
                    // }
                },
                views: {
                    'main@': {
                        templateUrl: 'app/project/project/overview.html',
                        controller: 'OverviewController'
                    }
                }
            })
            .state('dashboard.project.project', {
                url: '/project',
                authenticate: true,
                resolve: {
                    // resolvedProjectProvider: function(ProjectProvider) {
                    //     return ProjectProvider.promise;
                    // }
                },
                views: {
                    'main@': {
                        templateUrl: 'app/project/project/project.html',
                        controller: 'ProjectController'
                    }
                }
            })
            .state('dashboard.project.sprint', {
                url: '/sprint',
                authenticate: true,
                resolve: {
                    // resolvedTeamProvider: function(TeamProvider) {
                    //     return TeamProvider.promise;
                    // }
                },
                views: {
                    'main@': {
                        templateUrl: 'app/project/sprint/sprint.html',
                        controller: 'SprintController'
                    }
                }
            })
            .state('dashboard.project.story', {
                url: '/story',
                authenticate: true,
                resolve: {
                    // resolvedTeamProvider: function(TeamProvider) {
                    //     return TeamProvider.promise;
                    // }
                },
                views: {
                    'main@': {
                        templateUrl: 'app/project/story/story.html',
                        controller: 'StoryController'
                    }
                }
            });
    });
