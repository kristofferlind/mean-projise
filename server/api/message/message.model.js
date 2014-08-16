var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    MessageSchema = new Schema({
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        channel: {
            type: String,
            default: 'Global'
        },
        date: {
            type: Date,
            default: Date.now
        },
        message: String,
        username: String
    });

module.exports = mongoose.model('Message', MessageSchema);
