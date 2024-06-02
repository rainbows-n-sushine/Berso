const express = require("express");
const router = express.Router();
const {addComment,fetchAllCommentsForBusiness,deleteComment,editComment,getOneComment} = require('../controllers/comment')

router.post('/add',addComment)
router.delete('/delete',deleteComment)
router.put('/edit',editComment)
router.get("/getOne",getOneComment)
router.post('/fetchAllCommentsForBusiness',fetchAllCommentsForBusiness)

module.exports = router;
