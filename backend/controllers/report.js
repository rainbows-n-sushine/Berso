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

// exports.fetchAllReportsForBusiness=async(req,res)=>{
//     const {businessId}=req.body

   
//    try {
//     const reports= await Report.find({business:businessId})
//      res.json({success:true, message:"reports are fetched", reports:reports})

//    } catch (error) {
//     if(error){console.log("the error in fetchAllreportsForBusiness is : ",error)}
//    }
// }

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
