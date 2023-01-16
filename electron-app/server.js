const express = require('express');


exports.startServer = () =>{
  
    const app = express();

    app.use(express.urlencoded({extended: true})); 
    app.use(express.json());  

    const cors = require('cors');
    app.use(cors());
  
  

    const account = require('./routes/account')
    app.use('/account', account)

    const assets = require('./routes/assets')
    app.use('/assets', assets)
    
    
    app.listen(9990, () => console.log("server started")); //localhost porta 3000
}




 