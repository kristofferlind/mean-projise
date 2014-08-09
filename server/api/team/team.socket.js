/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var team = require('./team.model');

var sanitize = function(doc) {
    delete doc.hashedPassword;
    delete doc.salt;
    doc.users.forEach(function() {
        delete doc.hashedPassword;
        delete doc.salt;
    });
    return doc;
}

var onSave = function(socket, doc, cb) {
    socket.emit('team:save', doc);
}

var onRemove = function(socket, doc, cb) {
    socket.emit('team:remove', doc);
}


exports.register = function(socket) {
    team.schema.post('save', function(doc) {
        team.populate(doc, {
            path: 'users',
            select: '-salt -hashedPassword'
        }, function(err, populated) {
            var sanitized = sanitize(populated)
            onSave(socket, sanitized);
        })
    });
    team.schema.post('remove', function(doc) {
        team.populate(doc, {
            path: 'users',
            select: '-salt -hashedPassword'
        }, function(err, populated) {
            var sanitized = sanitize(populated)
            onRemove(socket, sanitized);
        })
    });
}
