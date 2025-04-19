const {Report} = require('../models/report')
<<<<<<< HEAD

exports.fileReport=async(req,res)=>{
    const {name,email,description,userId}=req.body
=======
const { report } = require('../routes/user')

exports.fileReport=async(req,res)=>{
    const {name,email,description,userId,type}=req.body
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
    try{
        const report= await Report({

            name,
            email,
            description,
            user:userId,
<<<<<<< HEAD
=======
            type
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e

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

<<<<<<< HEAD
// exports.fetchAllReportsForBusiness=async(req,res)=>{
//     const {businessId}=req.body

   
//    try {
//     const reports= await Report.find({business:businessId})
=======
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
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
//      res.json({success:true, message:"reports are fetched", reports:reports})

//    } catch (error) {
//     if(error){console.log("the error in fetchAllreportsForBusiness is : ",error)}
//    }
// }

<<<<<<< HEAD
//deletereport,editreport,getOnereport

exports.deleteReport=async(req,res)=>{

       
    try{
        const {reportId}=req.params
        if(reportId){
            const report=await Report.findOneAndDelete({_id:reportId})

            if (report){
                return res.json({message:'report deleted successfully', success:true})
            }
           
    
        }else{
            return res.json({message:'Error in deleting report', success:false})
        }
        

    }catch{(error)=>{

        if(error){

            console.log("error in deleting reveiw backend :",error.message)
        }
    } }

}

exports.editReport=async(req,res)=>{

    const {title,description,reportId}=req.body

 

 try {
    
    const report=await Report.findOneAndUpdate({_id:reportId})
if(report){
    return res.json({message:"report is updated successfully",success:true})
}else{
    return res.json({message:"report is not updated successfully",success:false})
}

 
 } catch (error) {
    if (error){
        console.log('error in edit report ',error.message)
    }
    
 }}

 exports.getOneReport=async(req,res)=>{
    const {reportId}=req.body
    try {
        if(reportId){
            const report= await Report.findOne({_id:reportId})

            if(report){
    return res.json({message:"here is the detail of the report ", success:true, report:report })
    

        }
      
        }
        else{
            return res.json({message:"trouble fetching the detail of this report, try refreshing ", success:false })

        }
        
    } catch (error) {
        if (error){
            console.log('error in getOne report ',error.message)
        }
        
        
    }


 }

 exports.fetchAll=async(req,res)=>{
    try{
    const reports=await Report.find()
    if(reports){
     res.json({message:"Succesfully fetched all the reports",reports:reports,success:true })
    }
    else{
        res.json({message:"Reports data s not available",success:false })
    }

    }catch(err){
        if(err){
            console.log('this is th error: ',err.message)
        }
    }

 }
=======
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
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
