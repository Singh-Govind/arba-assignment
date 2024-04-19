const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String },
  slug: { type: String, required: true },
  image: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: "user", required: true },
});

const CategoryModel = mongoose.model("category", categorySchema, "category");

module.exports = CategoryModel;
