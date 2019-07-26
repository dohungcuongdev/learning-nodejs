var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var UserSchema = new Schema(
    {
        name: { type: String, default: '' },
        username: { type: String, default: '' },
    },
    {
        collection: 'users'
    }
);


// Pre hook for save`
UserSchema.pre('save', function (next) { // must stand above mongoose.model(...
    // do stuff
    console.log('before save');
    next();

});


// Pre hook for `findOneAndUpdate`
UserSchema.pre('findOneAndUpdate', function (next) { // must stand above mongoose.model(...
    // do stuff
    console.log('before findOneAndUpdate');
    next();
});

var users = module.exports = mongoose.model('users', UserSchema);


UserSchema.path('username').validate(function (username) {
    return username.length;
}, 'Username cannot be blank');


UserSchema.path('name').validate(function (username) {
    return username.length;
}, 'Name cannot be blank');

module.exports.getUsers = function(callbackAction) {
    users.find(callbackAction);
}

//function get user by username
module.exports.getUserByUsername = function (username, callbackAction) {
    var query = { username: username };
    users.findOne(query, callbackAction);
};

module.exports.addUser = function (newuser, callbackAction) {
    newuser.save(callbackAction);
};

module.exports.editUser = function (username, name, callbackAction) {
    
};