const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const assetsController = require("../controllers/assets");



router.post('/createAsset', [], assetsController.createAsset); 

router.post('/getMyAssets', [], assetsController.getMyAssets); 


   
    
 

module.exports = router;