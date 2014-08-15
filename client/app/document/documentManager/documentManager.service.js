angular.module('projiSeApp').factory('DocumentManager', function($http, $modal, socket) {
    'use strict';

    $http.get('/api/documentsMeta').success(function(documentManager) {
        DocumentManager.all = angular.copy(documentManager);
        socket.syncUpdates('documentMeta', DocumentManager.all);
    });

    var DocumentManager = {
        all: [],
        activeDocument: undefined,
        create: function() {
            var createModal = $modal.open({
                templateUrl: 'app/document/documentManager/create/create.html',
                controller: 'documentCreateController'
            });

            createModal.result.then(function(newDocument) {
                $http.post('/api/documentsMeta', newDocument);
            });
        },
        show: function(documentMeta) {
            DocumentManager.activeDocument = angular.copy(documentMeta);
        },
        update: function(documentMeta) {
            var editModal = $modal.open({
                templateUrl: 'app/document/documentManager/edit/edit.html',
                controller: 'documentEditController',
                resolve: {
                    documentMeta: function() {
                        return documentMeta;
                    }
                }
            });

            editModal.result.then(function(editedDocument) {
                $http.post('/api/documentsMeta', editedDocument);
            });
        },
        delete: function(documentMeta) {
            $http.delete('/api/documentsMeta/' + documentMeta._id);
        }
    };

    return DocumentManager;
});
