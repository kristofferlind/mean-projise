/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var project = require('./project.model');

var onSave = function(socket, doc, cb) {
    socket.emit('project:save', doc);
}

var onRemove = function(socket, doc, cb) {
    socket.emit('project:remove', doc);
}


exports.register = function(socket) {
    project.schema.post('save', function(doc) {
        onSave(socket, doc);
    });
    project.schema.post('remove', function(doc) {
        onRemove(socket, doc);
    });
}
