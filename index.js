const express = require('express')
const connect = require('./db/db')
const app = express()
app.use(express.json())
app.use(require("./routes/route"))

app.listen('3002',async()=>{
    await connect()
    console.log('serve listen on http://localhost:3001')
    
})