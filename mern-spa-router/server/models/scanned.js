var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var ScannedSchema = new Schema(
    {
        build_id: { type: Number, default: 0, required: true },
        file_name: { type: String, default: '', required: true },
        problems: { type: Array, default: [], required: true },
        created_at: { type: Date, default: Date.now }
    },
    {
        collection: 'scanned'
    }
);

var scanned = module.exports = mongoose.model('scanned', ScannedSchema);