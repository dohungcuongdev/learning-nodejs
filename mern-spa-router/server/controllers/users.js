const userModel = require('../models/user')
const { commonHandleGetApi, commonHandlePostApi } = require('./');

exports.getUsers = function (request, response) {
    userModel.getUsers(function (err, resource) {
        commonHandleGetApi(response, err, resource);
    });
};

exports.getUserByUsername = function (request, response) {
    userModel.getUserByUsername(request.params.username, function (err, resource) {
        commonHandleGetApi(response, err, resource);
    });
};

exports.addUser = function (request, response) {
    const username = request.query.username;
    const newUser = new userModel({ username, name: request.query.name });
    userModel.getUserByUsername(username, (err, resource) => {
        if(err) {
            response.status(500).json(err);
        } else if (resource != null) {
            response.status(400).json({ error: 'Username is already existed' });
        } else {
            userModel.addUser(newUser, function (error, res) {
                commonHandlePostApi(response, error, res);
            });
        }
    });
};

exports.editUser = function(request, response) {
    
};