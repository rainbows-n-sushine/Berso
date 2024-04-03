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

avatar:Buffer,

})

userSchema.statics.isThisEmailInUse=async function (email){

    if(!email)throw new Error('invalid Email')
    const user= await this.findOne({email})

    try{
        if(user)return false

        return true;
        
    } catch(error){
        console.log("Error inside the isThisEmailInUse method: "+ error.message)
        return false


    }
    

}

module.exports=mongoose.model('User', userSchema);

