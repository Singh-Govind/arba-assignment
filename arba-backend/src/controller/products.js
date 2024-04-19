const mongoose = require("mongoose");
const ProductModel = require("../model/products");
const CategoryModel = require("../model/category");

const Product = {};

Product.getSingleProduct = async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      return res.status(401).json({ msg: "please provide all details" });
    }

    const product = await ProductModel.find({ _id: id });

    res.json({ product });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

Product.getProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, description, categoryName, sortOrder } = req.query;

    if (!id) {
      return res.status(401).json({ msg: "please provide all details" });
    }
    const ownerIdObj = new mongoose.Types.ObjectId(id);

    const pipeline = [];

    pipeline.push({ $match: { owner: ownerIdObj } });

    const matchQuery = {};
    if (title) matchQuery.title = { $regex: new RegExp(title, "i") };
    if (description)
      matchQuery.description = { $regex: new RegExp(description, "i") };
    if (categoryName) {
      const category = await CategoryModel.findOne({ name: categoryName });
      if (category) {
        matchQuery.category = category._id;
      } else {
        res.json({ products: [] });
        return;
      }
    }
    if (Object.keys(matchQuery).length > 0) {
      pipeline.push({ $match: matchQuery });
    }

    const sortField = "price";
    const sortDirection = sortOrder === "desc" ? -1 : 1;
    const sortStage = { $sort: { [sortField]: sortDirection } };
    pipeline.push(sortStage);

    pipeline.push({
      $lookup: {
        from: "category",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    });

    pipeline.push({ $unwind: "$category" });

    pipeline.push({
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        price: 1,
        "category.name": 1,
        "category.slug": 1,
        "category.image": 1,
        "category.owner": 1,
        image: 1,
        owner: 1,
      },
    });

    const products = await ProductModel.aggregate(pipeline);

    res.json({ products });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

Product.addProduct = async (req, res) => {
  try {
    let { title, description, image, price, categoryId, ownerId } = req.body;

    if (!title || !description || !image || !price || !categoryId || !ownerId) {
      return res.status(401).json({ msg: "please provide all details" });
    }

    const product = await ProductModel.create({
      title,
      description,
      image,
      price,
      category: categoryId,
      owner: ownerId,
    });

    res.json({ msg: "product added", product });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

Product.updateProduct = async (req, res) => {
  try {
    let data = req.body;
    let { id } = req.params;

    let obj = {};

    for (const d in data) {
      if (d === "id" || d === "ownerId" || d === "categoryId") {
        continue;
      }
      obj = {
        ...obj,
        [d]: data[d],
      };
    }

    if (!id) {
      return res.status(401).json({ msg: "please provide all details" });
    }

    await ProductModel.findOneAndUpdate({ _id: id }, obj);

    res.json({ msg: "product updated" });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

Product.deleteProduct = async (req, res) => {
  try {
    let { ids } = req.body;

    if (ids.length <= 0) {
      return res.status(401).json({ msg: "please provide all details" });
    }

    await ProductModel.deleteMany({ _id: { $in: ids } });

    res.json({ msg: "deleted" });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

module.exports = Product;
