var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.getUsers);
router.get('/all', usersCtrl.getAllUsers);
router.get('/single/:username', usersCtrl.getUserByUsername);
router.post('/addUser/', usersCtrl.addUser);
router.post('/addNewUser/', usersCtrl.addNewUser);
router.put('/updateNameOfUser', usersCtrl.updateNameOfUser);
router.put('/editNameOfUser', usersCtrl.editNameOfUser);

module.exports = router;