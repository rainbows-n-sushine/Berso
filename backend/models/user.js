const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
name:{
    type:'String',
    required:true
},
password:{
    type:'String',
    required:true
},
username:{
    type:'String',
    required:true,
    unique:true
},
email:{
    type:'String',
    required:true,
    unique:true
},
zip_code:{
    type:'String',
    required:true,

},
dob:{
    type:'String',
    // required:true,

},

avatar:Buffer,

})

userSchema.statics.isUniqueCredentials=async function (email,username){

    if(!email)throw new Error('invalid email')

    if(!username) throw new Error('Invalid username')
    const emailExists= await this.findOne({email})
const usernameExists= await this.findOne({username})
const uniqueCredentials={email:true,username:true}


    try{
        if(emailExists)
        {
            uniqueCredentials.email=false;
        }
        if(usernameExists){

            uniqueCredentials.username=false;
        }
        return uniqueCredentials;
        
    } catch(error){
        console.log("Error inside the isuniqueCredentials method: "+ error.message)
        return false


    }
    

}

module.exports=mongoose.model('User', userSchema);

