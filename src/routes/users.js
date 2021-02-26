let express = require('express');
let router = express.router();
let userController = require('../controllers/userControlles');
let logDBMiddleware = require('../middlewares/logDBMiddleware');

//Get users listing.
router.get('/', function(req, res, next) {
    res.send('respond with a source');
});

router.get('/register', usersController.register);

router.post('/register', logDBMiddleware, usersController.store);

module.exports = router;
