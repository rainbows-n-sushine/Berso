
const mongoose =require('mongoose')
const { Business } = require("../models/business");
exports.registerBusiness = async (req, res) => {
  console.log("im in business condtrollers");

    const {business,categories,businessOwnerId}=req.body
    console.log(business)
    console.log(categories)
    const {businessName,email,phone,website,location,address,businessDays,openingHours,averagePrice,description}= business

    console.log('this is the business from the frontend: ',business)
    try {
      // if (!businessOwnerId) {
      //   throw new Error('Missing businessOwnerId');
      // }
  
      // const isValidObjectId = mongoose.Types.ObjectId.isValid(businessOwnerId);
      // if (!isValidObjectId) {
      //   throw new Error('Invalid businessOwnerId');
      // }
  
      const business_db = new Business({
        business_name: businessName,
        email: email,
        phone: phone,
        website: website,
        location: location,
        address: address,
        business_days: businessDays,
        opening_hours: openingHours,
        average_price: averagePrice,
        description: description,
        category: categories,
        business_owner: businessOwnerId, // Convert string to ObjectId
      });
  
      await business_db.save();
      console.log(business_db);
  
      res.json({ message: "Business successfully created", success: true, business: business_db });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error while creating business" });
    }

};

exports.fetchByCategory = async (req, res) => {
  const { categoryId } = req.params;
console.log('this it hhsvjhvsh cate  :', categoryId)

// const id=JSON.parse(categoryId)


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

exports.fetchOne=async(req,res)=>{

const {businessId}=req.params
console.log('im in here',businessId)
try {
  const business=await Business.findById(businessId)
  console.log('this is the businessId',businessId,"and this is the busnes" ,business)

  if (business){
  console.log('im in here')
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
    console.log('this is the businessId ',businessId, 'this i sthe rating ',rating)
    const business = await Business.findById(businessId);
    if (business) {
      const average_rating = ((business.average_rating * business.rating_count) + rating) / (business.rating_count+1);
     const newCount=business.rating_count+1;
      const updatedBusiness = await Business.findByIdAndUpdate(businessId,{average_rating, rating_count:newCount});

      console.log('i just updated the average_rating.')
    }else{

      console.log('the business to be updated hasnt been found')
    }
  } catch (error) {
    console.error("Error updating business rating:", error);
  }
};


exports.getByBusinessOwner=async(req,res)=>{

const {businessOwnerId}=req.params
console.log('this is their id  ',businessOwnerId)

try {

  const businesses= await Business.find({business_owner:businessOwnerId})

  console.log('here are the businesses: ',businesses)
  if(businesses){
    return res.json({success:true,message:"Here are your businesses",businesses:businesses})
  }else{
    return res.json({success:false,message:"You currently have no business registered."})
  }
  
} catch (error) {
  if(error){

    console.log("error in getBusinessOwner in backend: ",error.message)
  }
  
}


}

// exports.getBusinessInfo=async(req,res)=>{

//   const {getBusiness}=req.body
//   const {category}=getBusiness



// }