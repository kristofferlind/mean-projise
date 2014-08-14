'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    IdeaSchema = new Schema({
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        },
        name: String,
        description: String,
        usersUp: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        usersDown: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        score: Number
    });

// IdeaSchema.virtual('score').get(function() {
//     this.score = this.usersUp.length - this.usersDown.length;
// });

module.exports = mongoose.model('Idea', IdeaSchema);
