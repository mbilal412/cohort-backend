// npx nodemon app.js (changes in code auto change in server)

const express = require('express')
const app = express()

app.get('/', (req, res)=>{
   res.send('hello world') 
})
app.get('/about', (req, res)=>{
   res.send('This is about page') 
})
app.get('/home', (req, res)=>{
   res.send('This is home page') 
})

app.listen(3000)