'use strict';

var idea = require('./idea.model'),
    onSave = function(socket, doc, cb) {
        socket.emit('idea:save', doc);
    },
    onRemove = function(socket, doc, cb) {
        socket.emit('idea:remove', doc);
    };

exports.register = function(socket) {
    idea.schema.post('save', function(doc) {
        onSave(socket, doc);
    });

    idea.schema.post('remove', function(doc) {
        onRemove(socket, doc);
    });
};
