const {Report} = require('../models/report')
const { report } = require('../routes/user')

exports.fileReport=async(req,res)=>{
    const {name,email,description,userId,type}=req.body
    try{
        const report= await Report({

            name,
            email,
            description,
            user:userId,
            type

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

exports.getAllReports=async(req,res)=>{

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
            return res.json({success:false,message:"failure in fetching reports"})
        }
        
    }
}


exports.fetchNewReports=async(req,res)=>{

    try {
        const reports = await Report.find({ status: { $in: ["unread", "pending"] } });
        if (reports){
            console.log('new reports is fetched')
            console.log("reports is reports",reports)
            
             const updatedReports=reports.map((report)=>({
                ...report.toObject(),
                notif_type:"New Report"
            }))
            console.log("reports is reports",updatedReports)

            return res.json({message:"new reports is fetched", success:true, reports:updatedReports})
        }else{
            return res.json({message:"new reports dont exist", success:false})


        }
        
    } catch (error) {
        if(error){
            console.log("error in fetching new busninesses: ",error.message)
            return res.json({message:"failure in fetching new reports", success:false})

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
