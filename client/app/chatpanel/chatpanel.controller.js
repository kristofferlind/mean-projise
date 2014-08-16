angular.module('projiSeApp').controller('ChatpanelController', function($scope, PanelSwitch, $timeout, Chat) {
    'use strict';

    $scope.Chat = Chat;

    $scope.newMessage = {
        message: ''
    };

    $scope.chatpanelActive = PanelSwitch.chatpanel.get();

    $scope.$on('chatpanel:switched', function() {
        $scope.chatpanelActive = PanelSwitch.chatpanel.get();

        if ($scope.chatpanelActive !== PanelSwitch.chatpanel.get()) {
            $timeout(function() {
                $scope.chatpanelActive = PanelSwitch.chatpanel.get();
            });
        }
    });

    $scope.sendMessage = function($event) {
        // if enter & shift
        if ($event.keyCode === 13 && $event.shiftKey) {
            return false;
        } else {
            //if enter & not shift
            if ($event.keyCode === 13 && !$event.shiftKey) {
                //empty messages are kind of useless
                if ($scope.newMessage.message === '') {
                    $event.preventDefault(); //we dont want a newline in this case
                    return false;
                }
                $event.preventDefault(); //no newline
                //add message to firebase
                Chat.sendMessage($scope.newMessage);
                //clear input field
                // $scope.newMessage.message.focus();
            }
        }
    };
});
