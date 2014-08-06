angular.module('projiSeApp').factory('PanelSwitch', function($rootScope) {
    'use strict';

    var _navpanel = true,
        _chatpanel = true,
        PanelSwitch = {
            navpanel: {
                switch: function() {
                    _navpanel = !_navpanel;
                    $rootScope.$broadcast('navpanel:switched');
                },
                get: function() {
                    return _navpanel;
                }
            },
            chatpanel: {
                switch: function() {
                    _chatpanel = !_chatpanel;
                    $rootScope.$broadcast('chatpanel:switched');
                },
                get: function() {
                    return _chatpanel;
                }
            }
        };

    return PanelSwitch;
});
