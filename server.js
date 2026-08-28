require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const jobsRouter = require('./jobsRouter')

app.use(cors())
app.use('/jobs',jobsRouter)

app.use(express.static('public'))

app.listen(process.env.PORT,()=>{
  console.log('Server is running')
})