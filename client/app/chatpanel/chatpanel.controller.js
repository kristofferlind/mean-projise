angular.module('projiSeApp').controller('ChatpanelController', function($scope, PanelSwitch, $timeout) {
    'use strict';

    $scope.chatpanelActive = PanelSwitch.chatpanel.get();

    $scope.$on('chatpanel:switched', function() {
        $scope.chatpanelActive = PanelSwitch.chatpanel.get();

        if ($scope.chatpanelActive !== PanelSwitch.chatpanel.get()) {
            $timeout(function() {
                $scope.chatpanelActive = PanelSwitch.chatpanel.get();
            });
        }
    });
});
