// IMPORT EXPRESS AND PATH
const express = require('express');


//IMPORT CONTROLLERS 
const mainpageController = require('../controllers/mainpage');

//CREATE AN INSTANCE OF Router
const router = express.Router();

//CREATE A ROUTER FOR USERS 
router.get('/home',mainpageController.gethomePage);
router.get('',mainpageController.geterrorPage)
module.exports = router;

