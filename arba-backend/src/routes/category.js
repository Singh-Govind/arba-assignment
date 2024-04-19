const express = require("express");
const Category = require("../controller/category");

const router = express.Router();

router.get("/:id", Category.getCategory);
router.get("/single/:id", Category.getSingleCategory);
router.post("/add", Category.addCategory);
router.post("/update", Category.updateCategory);
router.delete("/:id", Category.deleteCategory);

module.exports = router;
