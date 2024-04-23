const {Business}=require('../models/business')
exports.registerBusiness=async(req,res)=>{

    console.log('im in business condtrollers')

    const {business,categories}=req.body
    console.log(business)
    const {businessName,email,phone,website,location,address,businessDays,openingHours,averagePrice,description}= business
try { 

    
    const business_db= await new Business({

     business_name:businessName,
     email:email,
     phone:phone,
     website:website,
     location:location,
     category:categories,
     address:address,
     business_days:businessDays,
     opening_hours:openingHours,
     average_price:averagePrice,
     description:description,
     category:categories


    })
    

    business_db.save()
res.json({message:"business successfuly created", success:true,business:business_db})

    
} catch (error) {
    if(error){

        console.log("error in business registery",error.message())
    }
    
}
   

}