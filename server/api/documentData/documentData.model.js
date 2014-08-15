var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    DocumentDataSchema = new Schema({
        documentId: {
            type: Schema.Types.ObjectId,
            ref: 'DocumentMeta'
        },
        data: String
    });

module.exports = mongoose.model('DocumentData', DocumentDataSchema);
