const {Report} = require('../models/report')

exports.fileReport=async(req,res)=>{
    const {name,email,description,userId}=req.body
    try{
        const report= await Report({

            name,
            email,
            description,
            user:userId,

        })
        report.save()

        return res.json({success:true,message:"report successfully submitted",report:report})
    }catch{
        (err)=>{if(err){
            console.log(err.message)
            return res.json({success:false,message:"report filed to submit"})
            
        }}
    }
}

exports.getAllReports=async()=>{

    try {
        const reports=await Report.find()
        if(reports){
            return res.json({success:true, reports:reports, message:"here are reports"})
        }
        else{

            return res.json({success:false,message:"There are no reports yet"})
        }
        
        
    } catch (error) {
        if(error){
            console.log("error in getAllReports",error.message)
            return res.json({success:false,message:"There are no reports yet"})
        }
        
    }
}

// exports.fetchAllreportsForBusiness=async(req,res)=>{
//     const {businessId}=req.body

//    const reports= await report.find()
//    try {
//      res.json({success:true, message:"reports are fetched", reports:reports})

//    } catch (error) {
//     if(error){console.log("the error in fetchAllreportsForBusiness is : ",error)}
//    }
// }

// //deletereport,editreport,getOnereport

// exports.deletereport=async(req,res)=>{

//     const {reportId}=req.params

    
//     try{
//         const report=await report.findOneAndDelete({_id:reportId})

//         if (report){
//             return res.json({message:'report deleted successfully', success:true})
//         }
//         else{
//             return res.json({message:'Error in deleting report', success:false})
//         }


//     }catch{(error)=>{

//         if(error){

//             console.log("error in deleting reveiw backend :",error.message)
//         }
//     } }

// }

// exports.editreport=async(req,res)=>{

//     const {title,description,reportId}=req.body

 

//  try {
    
//     const report=await report.findOneAndUpdate({_id:reportId})
// if(report){
//     return res.json({message:"report is updated successfully",success:true})
// }else{
//     return res.json({message:"report is not updated successfully",success:false})
// }

 
//  } catch (error) {
//     if (error){
//         console.log('error in edit report ',error.message)
//     }
    
//  }}

//  exports.getOnereport=async(req,res)=>{
//     const {reportId}=req.body
//     try {
//         const report= await report.findOne({_id:reportId})

//         if(report){
// return res.json({message:"here is the detail of the report ", success:true, report:report })

//         }
//         else{
//             return res.json({message:"trouble fetching the detail of this report, try refreshing ", success:false })

//         }
        
//     } catch (error) {
//         if (error){
//             console.log('error in getOne report ',error.message)
//         }
        
        
//     }


//  }
