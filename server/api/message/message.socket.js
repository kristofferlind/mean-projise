'use strict';

var message = require('./message.model'),
    onSave = function(socket, doc, cb) {
        socket.emit('message:save', doc);
    },
    onRemove = function(socket, doc, cb) {
        socket.emit('message:remove', doc);
    };

exports.register = function(socket) {
    message.schema.post('save', function(doc) {
        onSave(socket, doc);
    });

    message.schema.post('remove', function(doc) {
        onRemove(socket, doc);
    });
};
