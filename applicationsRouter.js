const express = require('express')
const router = express.Router()

const application = []


router.post('/',(req,res)=>{
  const {name,email,job} = req.body
  console.log(req.body) 
  application.push({
    name ,
    email,
    job
  })
  res.json({
    message : `Application got submitted`
  })
})

router.get('/',(req,res)=>{
  res.json(application);
})


router.delete('/',(req,res)=>{
  application.length=0
  res.json({
    message : "Applications reset successful"
  })
})


module.exports=router