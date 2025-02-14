const { Category } = require("../models/category")

exports.addCategory=async(req,res)=>{
<<<<<<< HEAD
    const {name,description}=req.body.category
=======
    const {name,description,icon}=req.body.category
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
console.log("name and the description",name,"  ",description)
    try{
        const newCategory= await Category({

            name:name,
            description:description,
            icon:icon

        })
        newCategory.save()
        return res.json({success:true,message:"category successfully created"})
    }catch{
        (err)=>{if(err){console.log(err)}}
    }
}

exports.fetchAll=async(req,res)=>{

   try {
    console.log('im herr')
    
<<<<<<< HEAD
    const categories= await Category.find().maxTime(300000)

=======
    const categories= await Category.find().maxTimeMS(50000)
    console.log("this is catagories",categories)
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
    if(categories){

        res.json({success:true, message:"category is fetched", categories:categories})
    }else{

        res.json({success:false, message:"No categories yet."})
    }
     

   } catch (error) {
    if(error){console.log("the error in fetchAll category is : ",error)}
   }
}