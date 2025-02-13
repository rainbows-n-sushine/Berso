const express = require("express");
const router = express.Router();
const {addCategory,fetchAll} = require('../controllers/category')

router.post('/register',addCategory)
router.get('/fetchAll',fetchAll)

module.exports = router;
