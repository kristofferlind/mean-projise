/**
 * @ngdoc object
 * @description Manages states and general settings for project views
 */
angular.module('projiSeApp')
    .config(['$stateProvider', function($stateProvider) {
    'use strict';

    $stateProvider
        .state('dashboard.project', {
            url: '',
            abstract: true,
            resolve: {
                resolvedProjectProvider: ['ProjectProvider', function(ProjectProvider) {
                    return ProjectProvider.promise;
                }],
                resolvedSprintProvider: ['SprintProvider', function(SprintProvider) {
                    return SprintProvider.promise;
                }]
            }
        })
        .state('dashboard.project.overview', {
            url: '/overview',
            authenticate: true,
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
            views: {
                'main@': {
                    templateUrl: 'app/project/story/story.html',
                    controller: 'StoryController'
                }
            }
        });
}]);
