/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var sprint = require('./sprint.model');

// var sanitize = function(doc) {
//     delete doc.hashedPassword;
//     delete doc.salt;
//     doc.users.forEach(function() {
//         delete doc.hashedPassword;
//         delete doc.salt;
//     });
//     return doc;
// }

var onSave = function(socket, doc, cb) {
    socket.emit('sprint:save', doc);   //project is used as root for everything in client
};

var onRemove = function(socket, doc, cb) {
    socket.emit('sprint:remove', doc);
};

exports.register = function(socket) {
    // project.schema.post('save', function(doc) {
    //     project.populate(doc, {
    //         path: 'users',
    //         select: '-salt -hashedPassword'
    //     }, function(err, populated) {
    //         var sanitized = sanitize(populated)
    //         onSave(socket, sanitized);
    //     })
    // });
    // project.schema.post('remove', function(doc) {
    //     project.populate(doc, {
    //         path: 'users',
    //         select: '-salt -hashedPassword'
    //     }, function(err, populated) {
    //         var sanitized = sanitize(populated)
    //         onRemove(socket, sanitized);
    //     })
    // });

    sprint.schema.post('save', function(doc) {
        onSave(socket, doc);
    });

    sprint.schema.post('remove', function(doc) {
        onRemove(socket, doc);
    });
};
