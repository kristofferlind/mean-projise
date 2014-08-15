'use strict';

angular.module('projiSeApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('dashboard.document', {
                url: '/documents',
                authenticate: true,
                resolve: {
                    resolvedProjectProvider: function(ProjectProvider) {
                        return ProjectProvider.promise;
                    },
                    resolvedSprintProvider: function(SprintProvider) {
                        return SprintProvider.promise;
                    }
                },
                views: {
                    'main@': {
                        templateUrl: 'app/document/documentManager/documentManager.html',
                        controller: 'DocumentManagerController'
                    }
                }
            })
            .state('dashboard.document.list', {
                url: '/list',
                authenticate: true,
                views: {
                    'manager': {
                        templateUrl: 'app/document/documentManager/documentList.html',
                        controller: 'DocumentListController'
                    },
                    'viewer': {
                        templateUrl: 'app/document/documentViewer/documentViewer.html',
                        controller: 'DocumentViewerController'
                    }
                }
            })
            .state('dashboard.document.editor', {
                authenticate: true,
                views: {
                    'manager': {
                        templateUrl: 'app/document/documentEditor/documentEditor.html',
                        controller: 'DocumentEditorController'
                    },
                    'viewer': {
                        templateUrl: 'app/document/documentViewer/documentViewer.html',
                        controller: 'DocumentViewerController'
                    }
                }
            });
    });
