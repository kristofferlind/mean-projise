'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SprintSchema = new Schema({
    name: String,
    goal: String,
    start: Date,
    end: Date,
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});

module.exports = mongoose.model('Sprint', SprintSchema);
