'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    TaskSchema = new Schema({
        description: String,
        isDone: Boolean,
        storyId: {
            type: Schema.Types.ObjectId,
            ref: 'Story'
        }
    });

module.exports = mongoose.model('Task', TaskSchema);
