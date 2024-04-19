const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
  image: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: "user", required: true },
});

const ProductModel = mongoose.model("product", productSchema, "product");

module.exports = ProductModel;
