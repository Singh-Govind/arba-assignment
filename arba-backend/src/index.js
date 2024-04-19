const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dqzdalyh0",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const dbConnection = require("./config/dbConfig");
const UserRouter = require("./routes/user");
const CategoryRouter = require("./routes/category");
const ProductRouter = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/user", UserRouter);
app.use("/category", CategoryRouter);
app.use("/product", ProductRouter);

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Convert buffer to base64 string
    const base64String = req.file.buffer.toString("base64");

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64String}`,
      {
        folder: "uploads", // Optional: specify a folder in Cloudinary for uploaded images
        resource_type: "auto", // Automatically detect the type of resource (image, video, raw)
        public_id: `${Date.now()}-${req.file.originalname}`, // Use a unique filename for the uploaded image
      }
    );

    res.status(200).json({
      message: "Image uploaded successfully.",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading image." });
  }
});

app.get("/", (req, res) => {
  res.json({ msg: "welcome to home route" });
});

app.listen(PORT, async () => {
  await dbConnection();
  console.log(`server started at ${PORT}`);
});

module.exports = app;
