var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.getUsers);
router.get('/:username', usersCtrl.getUserByUsername);
router.post('/', usersCtrl.addUser);
router.put('/', usersCtrl.editUser);

module.exports = router;