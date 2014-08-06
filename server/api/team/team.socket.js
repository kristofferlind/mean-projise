/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var team = require('./team.model');

var onSave = function(socket, doc, cb) {
    socket.emit('team:save', doc);
}

var onRemove = function(socket, doc, cb) {
    socket.emit('team:remove', doc);
}


exports.register = function(socket) {
    team.schema.post('save', function(doc) {
        onSave(socket, doc);
    });
    team.schema.post('remove', function(doc) {
        onRemove(socket, doc);
    });
}
