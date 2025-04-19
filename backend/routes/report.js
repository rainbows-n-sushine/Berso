const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
<<<<<<< HEAD
const {fileReport,fetchAll,deleteReport,editReport,getOneReport} = require('../controllers/report')

router.post('/create',fileReport)
router.get('/fetch-all',fetchAll)
router.delete('/delete',deleteReport)
router.put('/edit',editReport)
router.get("/getOne",getOneReport)
=======
const {fileReport,getAllReports,fetchNewReports} = require('../controllers/report')

router.post('/create',fileReport)
router.get('/fetch-all',getAllReports)
router.get('/fetch-new-reports',fetchNewReports)
// router.delete('/delete',deleteReport)
// router.put('/edit',editReport)
// router.get("/getOne",getOneReport)
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
// router.post('/fetchAllReportsForBusiness',fetchAllReportsForBusiness)

module.exports = router;
