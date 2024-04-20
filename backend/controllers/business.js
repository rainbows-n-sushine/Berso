const {Business}=require('../models/business')
exports.registerBusiness=async(req,res)=>{

    const {business,category}=req.body
    const {businessName,email,phone,website,location,address,businessDays,openingHours,averagePrice,description}= business
try { const business_db= await new Business({

     business_name:businessName,
     email:email,
     phone:phone,
     website:website,
     location:location,
     address:address,
     business_days:businessDays,
     opening_hours:openingHours,
     average_price:averagePrice,
     description:description


    })
res.json({message:"business successfuly created", success:true,business:business_db})

    
} catch (error) {
    if(error){

        console.log("error in business registery",error.message())
    }
    
}
   

}