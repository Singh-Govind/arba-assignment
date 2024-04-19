const express = require("express");
const Product = require("../controller/products");

const router = express.Router();

router.get("/single/:id", Product.getSingleProduct);
router.get("/:id", Product.getProduct);
router.post("/add", Product.addProduct);
router.patch("/update/:id", Product.updateProduct);
router.delete("/", Product.deleteProduct);

module.exports = router;
