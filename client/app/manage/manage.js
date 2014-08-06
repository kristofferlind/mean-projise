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
                    TeamProvider: function(TeamProvider) {
                        return TeamProvider.promise;
                    },
                    Session: function(Session) {
                        return Session;
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
