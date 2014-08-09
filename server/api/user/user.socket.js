/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var user = require('./user.model');

var sanitize = function(doc) {
    delete doc.hashedPassword;
    delete doc.salt;
    return doc;
}

var onSave = function(socket, doc, cb) {
    socket.emit('user:save', doc);
}

var onRemove = function(socket, doc, cb) {
    socket.emit('user:remove', doc);
}


exports.register = function(socket) {
    user.schema.post('save', function(doc) {
        var sanitized = sanitize(doc);
        onSave(socket, sanitized);
    });
    user.schema.post('remove', function(doc) {
        var sanitized = sanitize(doc);
        onRemove(socket, sanitized);
    });
}
