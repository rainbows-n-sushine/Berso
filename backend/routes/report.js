const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const {fileReport} = require('../controllers/report')

router.post('/create',fileReport)
// router.delete('/delete',deleteReport)
// router.put('/edit',editReport)
// router.get("/getOne",getOneReport)
// router.post('/fetchAllReportsForBusiness',fetchAllReportsForBusiness)

module.exports = router;
