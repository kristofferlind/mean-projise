var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    DocumentMetaSchema = new Schema({
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        },
        sprintId: {
            type: Schema.Types.ObjectId,
            ref: 'Sprint'
        },
        storyId: {
            type: Schema.Types.ObjectId,
            ref: 'Story'
        },
        name: String,
        description: String
    });

module.exports = mongoose.model('DocumentMeta', DocumentMetaSchema);
