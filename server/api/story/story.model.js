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
    }
});

module.exports = mongoose.model('Story', StorySchema);
