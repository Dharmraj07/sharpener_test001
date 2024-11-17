const express = require('express');
const { getAllProduct, addProduct } = require('../controller/productController');
const router = express.Router();

router.get("/",getAllProduct);
router.post("/",addProduct);


module.exports = router;
