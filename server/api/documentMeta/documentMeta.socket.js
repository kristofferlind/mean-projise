'use strict';

var documentMeta = require('./documentMeta.model'),
    onSave = function(socket, doc, cb) {
        socket.emit('documentMeta:save', doc);
    },
    onRemove = function(socket, doc, cb) {
        socket.emit('documentMeta:remove', doc);
    };

exports.register = function(socket) {
    documentMeta.schema.post('save', function(doc) {
        onSave(socket, doc);
    });

    documentMeta.schema.post('remove', function(doc) {
        onRemove(socket, doc);
    });
};
