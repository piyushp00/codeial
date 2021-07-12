const express = require('express');

//library for separating app route and controller
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));



//export
module.exports = router;  