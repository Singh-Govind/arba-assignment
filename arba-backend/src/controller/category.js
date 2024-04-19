const mongoose = require("mongoose");
const CategoryModel = require("../model/category");

const Category = {};

Category.getSingleCategory = async (req, res) => {
  try {
    let { id } = req.params;
    let { cid } = req.query;

    if (!cid || !id) {
      return res.status(401).json({ msg: "please provide all details" });
    }

    const category = await CategoryModel.find({ _id: cid, owner: id });

    res.json({ category });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

Category.getCategory = async (req, res) => {
  try {
    let { id } = req.params;
    let queries = req.query;

    if (!id) {
      return res.status(401).json({ msg: "please provide all details" });
    }
    const ownerIdObj = new mongoose.Types.ObjectId(id);

    let pipeline = [{ $match: { owner: ownerIdObj } }];

    if (queries) {
      const matchQueries = [];

      for (const key in queries) {
        if (key === "name" || key === "slug") {
          matchQueries.push({
            [key]: { $regex: new RegExp(queries[key], "i") },
          });
        }
      }
      if (matchQueries.length > 0) {
        pipeline.push({ $match: { $or: matchQueries } });
      }
    }

    const categories = await CategoryModel.aggregate(pipeline);

    res.json({ categories });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

Category.addCategory = async (req, res) => {
  try {
    let { id, name, slug, image } = req.body;

    if (!id || !slug || !image || !name) {
      return res.status(401).json({ msg: "please provide all details" });
    }

    const category = await CategoryModel.create({
      name,
      slug,
      image,
      owner: id,
    });

    res.json({ msg: "category added", category });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

Category.updateCategory = async (req, res) => {
  try {
    let data = req.body;

    let obj = {};

    for (const d in data) {
      if (d === "id") {
        continue;
      }
      obj = {
        ...obj,
        [d]: data[d],
      };
    }

    if (!data.id) {
      return res.status(401).json({ msg: "please provide all details" });
    }

    const category = await CategoryModel.findOneAndUpdate(
      { _id: data.id },
      obj
    );

    res.json({ msg: "category updated", category });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

Category.deleteCategory = async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      return res.status(401).json({ msg: "please provide all details" });
    }

    await CategoryModel.findOneAndDelete({ _id: id });

    res.json({ msg: "deleted" });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

module.exports = Category;
