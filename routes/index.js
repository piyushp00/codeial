const express = require('express');

//library for separating app route and controller
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('Router Loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use("/posts", require('./posts'));
router.use('/comments', require('./comments'));
//for any further routes,access from here
//router.use('/routerName', require('./routerFile'));



//export
module.exports = router;  