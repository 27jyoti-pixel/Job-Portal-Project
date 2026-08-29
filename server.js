require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const jobsRouter = require('./jobsRouter')
const applicationsRouter = require('./applicationsRouter')

app.use(cors())
app.use(express.json())
app.use('/jobs',jobsRouter)
app.use('/applications',applicationsRouter);

app.use(express.static('public'))

app.listen(process.env.PORT,()=>{
  console.log('Server is running')
})