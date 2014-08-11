/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var story = require('./story.model');

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
    socket.emit('story:save', doc);   //project is used as root for everything in client
};

var onRemove = function(socket, doc, cb) {
    socket.emit('story:remove', doc);
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

    story.schema.post('save', function(doc) {
        onSave(socket, doc);
    });

    story.schema.post('remove', function(doc) {
        onRemove(socket, doc);
    });
};
