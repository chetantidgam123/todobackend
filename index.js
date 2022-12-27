const express = require('express')
const connect = require('./db/db')
const cors = require('cors')

const app = express()
app.use(express.urlencoded({extended:false}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  })
app.use(cors({origin:["http://localhost:3000","https://melodious-twilight-b98265.netlify.app"],credentials:true}))
app.use(express.json())
app.use(require("./routes/route"))
app.listen('3001',async()=>{
    await connect()
    console.log('serve listen on http://localhost:3001')
    
})