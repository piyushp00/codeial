const express = require('express');

//library for separating app route and controller
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/', homeController.home2);
//router.get('/home2', homeController.home2);
router.use('/users', require('./users'));

//for any further routes,access from here
//router.use('/routerName', require('./routerFile'));



//export
module.exports = router;  