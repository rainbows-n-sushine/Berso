const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
name:{
    type:String,
    // required:true
},
password:{
    type:String,
    // required:true
},
username:{
    type:String,
    // required:true,
    unique:true
},
email:{
    type:String,
    // required:true,
    unique:true
},
zip_code:{
    type:String,
    // required:true,

},
dob:{
    type:String,
    // required:true,

},

avatar:Buffer,

})

userSchema.statics.isUniqueCredentials=async function (email,username){

    console.log('email n username check credentials')

    if(!email)throw new Error('invalid email')

    if(!username) throw new Error('Invalid username')
    const emailExists= await this.findOne({email})
const usernameExists= await this.findOne({username})
const uniqueCredentials={email:true,username:true}


    try{
        if(emailExists)
        {
            uniqueCredentials.email=false;
            console.log('email exists')
        }
        if(usernameExists){

            uniqueCredentials.username=false;
            console.log('username exists')
        }
        return uniqueCredentials;
        
    } catch(error){
        console.log("Error inside the isuniqueCredentials method: ", error.message)
        return uniqueCredentials;


    }
    

}




userSchema.statics.userExists=async function(credential,password){



    const credenetialInUse=false
    if(!credential)throw new Error('invalid email')
    console.log(credential)

    const emailInUse=await this.findOne({email:credential})
    
if (emailInUse){
    console.log('Email is already in use')
    const correctPassword=await this.findOne({password})

    return true;
}
else{
    return false;
}}


const User=mongoose.model('User', userSchema);
module.exports={User}
