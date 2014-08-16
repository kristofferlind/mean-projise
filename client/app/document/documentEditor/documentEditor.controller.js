//documentEditor.controller.js
/**
 * @name documentEditorController
 * @description Viewlogic for document editor
 */
angular.module('projiSeApp').controller('DocumentEditorController', function($scope, DocumentManager) {
    'use strict';

    //Make DocumentManager service available in view
    $scope.DocumentManager = DocumentManager;
});
