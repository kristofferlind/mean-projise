'use strict';

var task = require('./task.model'),
    onSave = function(socket, doc, cb) {
        socket.emit('task:save', doc);
    },
    onRemove = function(socket, doc, cb) {
        socket.emit('task:remove', doc);
    };

exports.register = function(socket) {
    task.schema.post('save', function(doc) {
        onSave(socket, doc);
    });

    task.schema.post('remove', function(doc) {
        onRemove(socket, doc);
    });
};
