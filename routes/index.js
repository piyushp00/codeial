const express = require('express');

//library for separating app route and controller
const router = express.Router();
const homeController = require('../controllers/home_controllers');

console.log('router loaded');


router.get('/', homeController.home);



//export
module.exports = router;  