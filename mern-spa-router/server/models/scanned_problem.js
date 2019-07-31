var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var ScannedProblemSchema = new Schema(
    {
        repository: { type: String, default: '', required: true },
        build_count: { type: Number, default: 0, required: true },
        file_name: { type: String, default: '', required: true },
        line: { type: Number, default: 0, required: false },
        column: { type: Number, default: 0, required: false },
        severity: { type: String, default: '', required: false },
        message: { type: String, default: '', required: false },
        source: { type: String, default: '', required: false },
        created_at: { type: Date, default: new Date() }
    },
    {
        collection: 'scanned_problem'
    }
);

var scanned_problem = module.exports = mongoose.model('scanned_problem', ScannedProblemSchema);