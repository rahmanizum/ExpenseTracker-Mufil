//IMPORT EXPRESS AND PATH
const express = require('express');

//IMPORT CONTROLLERS 
const expenseController = require('../controllers/expenses');
const authController= require('../middleware/authetication');

//CREATE AN INSTANCE OF Router
const router = express.Router();
router.post('/addexpense',authController.authorization,expenseController.addExpenses);
router.get('/getexpenses',authController.authorization,expenseController.getExpenses);
router.delete('/delete/:dID',authController.authorization,expenseController.deletebyId)


module.exports = router;