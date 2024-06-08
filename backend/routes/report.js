const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const {fileReport,getAllReports} = require('../controllers/report')

router.post('/create',fileReport)
router.get('/fetch-all',getAllReports)
// router.delete('/delete',deleteReport)
// router.put('/edit',editReport)
// router.get("/getOne",getOneReport)
// router.post('/fetchAllReportsForBusiness',fetchAllReportsForBusiness)

module.exports = router;
