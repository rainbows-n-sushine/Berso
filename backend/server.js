var express=require('express');
var app=express();
require('dotenv').config()
const User=require('./models/user');
require('./models/db')

app.post("/create-user", async(req,res)=>{
const user=await User({
    name:'Jalal Addisu',
    email:"jalaladdisu@gmail.com",
    password:'hello',
    username:'jayaddisu',

})
await user.save()
res.json(user)
})
app.listen('8000',()=>{
    console.log("server is running successfully")
})

app.get('/',(req,res)=>{

    console.log('hello world')
    res.send('<h1 style="color:pink; background-color:hotpink;">Hello world</h1>')
})


