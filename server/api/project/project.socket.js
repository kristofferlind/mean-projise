/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var project = require('./project.model');
var populateQuery = [{path: 'users', select: '-salt -hashedPassword'}, {path: 'sprints', select: '', model: 'Sprint'}]


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
    socket.emit('project:save', doc);
}

var onRemove = function(socket, doc, cb) {
    socket.emit('project:remove', doc);
}


exports.register = function(socket) {
    project.schema.post('save', function(doc) {
        project.populate(doc, populateQuery, function(err, populated) {
            var sanitized = sanitize(populated)
            onSave(socket, sanitized);
        })
    });
    project.schema.post('remove', function(doc) {
        project.populate(doc, populateQuery, function(err, populated) {
            var sanitized = sanitize(populated)
            onRemove(socket, sanitized);
        })
    });
}
