'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    description: String,
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    sprints: [{
        type: Schema.Types.ObjectId,
        ref: 'Sprint'
    }],
    // tasks: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Task'
    // }]
});

module.exports = mongoose.model('Project', ProjectSchema);
