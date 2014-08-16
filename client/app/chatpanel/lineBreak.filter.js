//lineBreak.filter.js
/**
 * @name lineBreak
 * @description Replace linky linebreak to html linebreak
 * @todo Replace \n aswell
 * @todo Add options to make it reusable
 */
angular.module('projiSeApp')

.filter('lineBreak', function() {
    'use strict';

    return function(input) {
        //Do nothing if input is undefined
        if (input === undefined) {
            return;
        }
        //Replace tokenized linebreak with html linebreak and return
        return input.replace(/&#10;/g, '<br />');
    };
});
