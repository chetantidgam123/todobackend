const express = require('express')
const connect = require('./db/db')
const cors = require('cors')

const app = express()
app.use(function(req, res, next) {  
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin:true,credentials:true}));
app.use(require("./routes/route"))
app.listen('3001',async()=>{
    await connect()
    console.log('serve listen on http://localhost:3001')
    
})