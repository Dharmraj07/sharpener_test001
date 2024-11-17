const { addToCart, getAllCarts } = require("../controller/cartController");
const express = require('express');
const router = express.Router();

router.post("/",addToCart);
router.get("/",getAllCarts);

module.exports = router;


