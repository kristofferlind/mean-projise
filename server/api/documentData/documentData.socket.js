'use strict';

var documentData = require('./documentData.model'),
    onSave = function(socket, doc, cb) {
        socket.emit('documentData:save', doc);
    },
    onRemove = function(socket, doc, cb) {
        socket.emit('documentData:remove', doc);
    };

exports.register = function(socket) {
    documentData.schema.post('save', function(doc) {
        onSave(socket, doc);
    });

    documentData.schema.post('remove', function(doc) {
        onRemove(socket, doc);
    });
};
