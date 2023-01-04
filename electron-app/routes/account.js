const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const accountController = require("../controllers/account");



router.post('/getAccount',    
    [], 
    accountController.getAccount); 


router.post('/create',    
    [], 
    accountController.createWallet); 


router.post('/createTransaction', [], accountController.createTransaction)

    
module.exports = router;
