const express = require("express");
const User = require("../controller/user");

const router = express.Router();

router.post("/register", User.register);
router.post("/login", User.login);
router.post("/forgot-password", User.forgotPassword);
router.post("/update-password", User.updatePassword);
router.post("/update-profile", User.updateProfile);

module.exports = router;
