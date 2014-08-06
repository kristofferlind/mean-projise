angular.module('projiSeApp').controller('NavpanelController', function($scope, PanelSwitch, $timeout) {
    'use strict';

    $scope.navpanelActive = PanelSwitch.navpanel.get();

    $scope.$on('navpanel:switched', function() {
        if ($scope.navpanelActive !== PanelSwitch.navpanel.get()) {
            $timeout(function() {
                $scope.navpanelActive = PanelSwitch.navpanel.get();
            });
        }
    });
});
