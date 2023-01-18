const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const assetsController = require("../controllers/assets");
const upload = require('../middleware/upload'); //uploadImg middleware per l'upload delle immagini



router.post('/createAsset', [], assetsController.createAsset);

router.post('/createImagesAsset', upload.single('data'), assetsController.createImagesAsset)

router.post('/createDocAsset', upload.single('data'), assetsController.createDocAsset)

router.post('/getMyAssets', [], assetsController.getMyAssets); 

router.post('/lookupDataFromIPFSID',assetsController.lookupDataFromIPFSID);
    
 

module.exports = router;