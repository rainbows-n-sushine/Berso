var express=require('express');
var app=express();
require('dotenv').config()
const User=require('./models/user');
require('./models/db')

app.post("/create-user", async(req,res)=>{
    const email="jalal@gmail.com"
    const isNewUser=await User.isThisEmailInUse(email)
    if(!isNewUser){
        return res.json({success:false,message:"This email is already in use,try sign-in"})      
    }
    else{
        
        return res.json({success:true,message:"check  your email"}) 
        
    }
const user=await User({
    name:'Jalal Addisu',
    email:email,
    password:'hello',
    username:'jayaddisu',

})



app.post('/auth/user-sign-in',(req,res)=>{
    const {email,password}=req.body

    user.findOne({where:{email:email}})
    .then((user)=>{
        if (user.isEmpty()===true){
res.send('there is no user registered under that email')
        }
        else{
            if(user.password===password){
                res.send(true)

            }
           else{
            res.send(false)
           }
        }
       
    })

    
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


