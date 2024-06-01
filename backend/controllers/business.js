const { Business } = require("../models/business");
exports.registerBusiness = async (req, res) => {
  console.log("im in business condtrollers");

    const {business,categories,userId}=req.body
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
     user:userId


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

exports.listBusiness = async (req, res) => {
  const { category } = req.params;
  try {
    // Log the category being fetched
    console.log("Fetching businesses for category:", category);

    // Query the database for businesses with the specified category
    const businesses = await Business.find({ category });

    // Log the retrieved businesses
    console.log("Retrieved businesses:", businesses);

    // Send the retrieved businesses as JSON response
    res.json(businesses);
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error fetching businesses:", error);

    // Send an error response with status code 500 (Internal Server Error)
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
      res.json({message:"error in fetching businesses",success:false})
    }
  }

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