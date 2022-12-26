const express = require('express')
const connect = require('./db/db')
const cors = require('cors')

const app = express()
app.use(cors({origin:true}))
app.use(express.json())
app.use(require("./routes/route"))
app.listen('3001',async()=>{
    await connect()
    console.log('serve listen on http://localhost:3001')
    
})