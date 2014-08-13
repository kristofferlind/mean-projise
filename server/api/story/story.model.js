'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StorySchema = new Schema({
    name: String,
    description: String,
    tags: String,
    points: Number,
    priority: Number,
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    sprintId: {
        type: Schema.Types.ObjectId,
        ref: 'Sprint'
    },
    status: {
        type: String,
        enum: ['not started', 'in progress', 'completed']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Story', StorySchema);
