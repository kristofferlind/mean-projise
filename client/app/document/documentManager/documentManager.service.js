angular.module('projiSeApp').factory('DocumentManager', function($http, $q, $modal, $state, socket) {
    'use strict';

    $http.get('/api/documentsMeta').success(function(documentManager) {
        DocumentManager.all = angular.copy(documentManager);
        socket.syncUpdates('documentMeta', DocumentManager.all);
    });

    var DocumentManager = {
        all: [],
        activeDocument: undefined,
        activeDocumentData: {},
        create: function() {
            var createModal = $modal.open({
                templateUrl: 'app/document/documentManager/create/create.html',
                controller: 'documentCreateController'
            });

            createModal.result.then(function(newDocument) {
                $http.post('/api/documentsMeta', newDocument);
            });
        },
        edit: function(documentMeta) {
            DocumentManager.show(documentMeta).then(function() {
                $state.go('dashboard.document.editor');
            });
        },
        show: function(documentMeta) {
            var deferred = $q.defer();
            DocumentManager.activeDocument = angular.copy(documentMeta);
            $http.get('/api/documentsData/' + documentMeta._id).success(function(documentData) {
                DocumentManager.activeDocumentData = angular.copy(documentData);
                deferred.resolve();
            });

            return deferred.promise;
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
        updateData: function(documentData) {
            $http.put('/api/documentsData/' + documentData._id, documentData);
        },
        delete: function(documentMeta) {
            $http.delete('/api/documentsMeta/' + documentMeta._id);
        }
    };

    return DocumentManager;
});
