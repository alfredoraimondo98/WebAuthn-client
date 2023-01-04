const express = require('express');

const app = express();
  
  

const account = require('./routes/account')
app.use('/account', account)

 


 

app.listen(9990, () => console.log("server started")); //localhost porta 3000


 