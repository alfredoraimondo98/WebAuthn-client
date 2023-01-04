const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const accountController = require("../controllers/account");



router.get('/getAccount',    
    [], 
    accountController.getAccount); 


router.post('/create',    
    [], 
    accountController.createWallet); 
    
module.exports = router;
