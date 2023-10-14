// IMPORT EXPRESS AND PATH
const express = require('express');


//IMPORT CONTROLLERS 
const userController = require('../controllers/user');

//CREATE AN INSTANCE OF Router
const router = express.Router();

//CREATE A ROUTER FOR USERS
router.post('/signup',userController.signupAuthentication);
router.post('/signin',userController.signinAuthentication); 
router.get('',userController.usergethomePage);
// router.post('/addexpense',userController.addExpenses);
module.exports = router;

