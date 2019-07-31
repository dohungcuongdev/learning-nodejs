var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var ScannedFileSchema = new Schema(
    {
        repository: { type: String, default: '', required: true },
        build_count: { type: Number, default: 0, required: true },
        file_name: { type: String, default: '', required: true },
        created_at: { type: Date, default: new Date() }
    },
    {
        collection: 'scanned_file'
    }
);

var scanned_file = module.exports = mongoose.model('scanned_file', ScannedFileSchema);