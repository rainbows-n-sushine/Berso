const { Category } = require("../models/category")

exports.addCategory=async(req,res)=>{
    const {name,description}=req.body.category
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
    
    const categories= await Category.find({})

    if(categories){

        res.json({success:true, message:"category is fetched", categories:categories})
    }else{

        res.json({success:false, message:"No categories yet."})
    }
     

   } catch (error) {
    if(error){console.log("the error in fetchAll category is : ",error)}
   }
}