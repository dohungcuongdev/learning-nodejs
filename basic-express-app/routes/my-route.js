const express = require('express');
const router = express.Router();

var mw = require('../my-middleware.js');
router.use(mw({ option1: '5', option2: '6' })); // use middleware in route

router.get('/my-route', (req, res) => {  // http://localhost:8080/routes/my-route
    res.send('hello from my-route');
})

module.exports = router;