const express = require('express')

const router = express.Router()


const jobs = [
  {
    title : "Frontend Developer",
    date : "Posted on 21/05/2026",
    head : "Tech Solutions",
    skills : ["HTML","CSS","JavaScript"],
    salary : "$60,000 - $80,000",
    place : "New York",
  },
  {
    title : "Backend Developer",
    date : "Posted on 21/06/2026",
    head : "Innovative Apps",
    skills : ["Node.js","Express","MongoDB"],
    salary : "$70,000 - $ 90,000",
    place : "San Francisco"
  },
  {
    title : "Full Stack Developer",
    date : "Posted on 8/05/2026",
    head : "Web Works",
    skills : ["JavaScript","React","Node.js"],
    salary : "$80,000 - $100,000",
    place : "Remote"
  },
  {
    title : "UI/UX Designer",
    date : "Posted on 27/07/2026",
    head : "Creative Minds",
    skills : ["PhotoShop","Illustrator","Figma"],
    salary : "$50,000 - $70,000",
    place : "Austin"
  },
  {
    title : "Data Scientist",
    date : "Posted on 20/04/2026",
    head : "Data Insights",
    skills : ["Python","R","Rusk"],
    salary : "$90,000 - $120,000",
    place : "Boston"
  }
]


router.get('/',(req,res)=>{
    res.json(jobs);
})

module.exports = router