const { Business } = require("../models/business");
exports.registerBusiness = async (req, res) => {
  console.log("im in business condtrollers");

    const {business,categories,businessOwnerId}=req.body
    console.log(business)
    console.log(categories)
    const {businessName,email,phone,website,location,address,businessDays,openingHours,averagePrice,description}= business


    
    const business_db= await Business({

     business_name:businessName,
     email:email,
     phone:phone,
     website:website,
     location:location,
     address:address,
     business_days:businessDays,
     opening_hours:openingHours,
     average_price:averagePrice,
     description:description,
     category:categories,
     business_owner:businessOwnerId


    })
    console.log(business_db)
    
    try { 
    await business_db.save()
    console.log(business_db)
res.json({message:"business successfuly created", success:true,business:business_db})

    
} catch (error) {
    if(error){

        console.log("error in business registery",error.message())
    }
  }
};

exports.fetchByCategory = async (req, res) => {
  const { categoryId } = req.params;
console.log('this it hhsvjhvsh cate  :', categoryId)



try {
  const businesses = await Business.find({ category:{$in:[categoryId]}});

    console.log("Retrieved businesses:", businesses);

    if(businesses){

      res.json({success:true,message:"businesses in the category fetched successfully",businesses:businesses})
    }else{
      res.json({success:false,message:"businesses in the category failed to fetch"})

    }
  } catch (error) {

    console.error("Error fetching businesses:", error);
    res.status(500).json({ error: "Internal server error" });

  }
};

exports.fetchAll=async(req,res)=>{
  const businesses= await Business.find()

  try{
    return res.json({message:"businesses fetched successfully",businesses:businesses,success:true})
  }catch{(err)=>{
    if(err){
      console.log(err)
      res.json({message:"trouble fetching businesses,try again",success:false})
    }
  }

  }
}

// exports.getOneBusiness=async(req,res)=>{
//    const {businessId}=req.body

//    try {
//     const business=await Business.getOne({_id:businessId})
//     if(business){
//       return res.json({message:"Business fetched successfully" , success:true , business:business})
//     }else{
//       return res.json({message:"Trouble fetching business" , success:false })
//     }
//   }

//   }

// }

exports.fetchOne=async(req,res)=>{

const {businessId}=req.params

try {
  const business=await Business.findOne({_id:businessId})

  if (business){

    return res.json ({message:"business fetched successfully",success:true,business:business })
  }
  else{

    return res.json ({message:"erorr fetching teh business",success:false})
  }

  
} catch (error) {

  if(error){

    console.log('error in fetchOne: ',error.message)
  }}}




  exports.deleteBusiness=async(req,res)=>{
  const {businessId} =req.params

  try {
    const business=await business.findIdAndDelete(businessId)
    if (business){

      return res.json ({message:"business deleted successfully",success:true})
    }else{
      return res.json ({message:"Business doesnt exist. Deleting failed.",success:false})      
    }
    
  } catch (error) {
    if(error){

      console.log('error in delete business: ',error.message)
    }
    
  }
  
}

exports.updateOne=async(req,res)=>{

  const {businessId,business,categories,businessOwnerId} =req.body

  const {businessName,email,phone,website,location,address,businessDays,openingHours,averagePrice,description}= business


  try {
    
    const business_db= await Business.findOneAndUpdate({_id:businessId},{

     business_name:businessName,
     email:email,
     phone:phone,
     website:website,
     location:location,
     address:address,
     business_days:businessDays,
     opening_hours:openingHours,
     average_price:averagePrice,
     description:description,
     category:categories,
     business_owner:businessOwnerId
    },{new:true})

    if(business_db){
    return res.json({message:"Bussiness information updated successfully", success:true})

    }else{
      return res.json({message:"Try again, failed at updating business information", success:false})


    }

  } catch (error) {
    
  }


    


}


exports.updateBusinessRating = async (businessId, rating) => {
  try {
    const business = await Business.findById(businessId);
    if (business) {
      business.review_count++;
      business.average_rating = (business.average_rating * (business.review_count - 1) + rating) / business.review_count;
      await business.save();
    }
  } catch (error) {
    console.error("Error updating business rating:", error);
  }
};


