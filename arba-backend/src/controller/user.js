const bcrypt = require("bcrypt");
const UserModel = require("../model/user");

const saltRounds = 10;

const User = {};

User.login = async (req, res) => {
  try {
    let { userName, password } = req.body;

    let user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    let isPassCorrect = await bcrypt.compare(password, user.password);

    if (!isPassCorrect) {
      return res.status(401).json({ msg: "incorrect password" });
    }

    user = {
      id: user._id,
      userName: user.userName,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
    };

    res.json({ msg: "user", user });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

User.register = async (req, res) => {
  try {
    let { userName, email, fullName, password, avatar } = req.body;

    if (!userName || !email || !fullName || !password) {
      return res.status(401).json({ msg: "please send all the data" });
    }

    if (avatar == "" || !avatar) {
      avatar =
        "https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face.jpg";
    }

    userName = userName.toLowerCase();
    email = email.toLowerCase();

    if (email.split("@").length < 2) {
      return res.status(401).json({ msg: "please provide valid email" });
    }

    const user = await UserModel.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    if (user) {
      return res.status(404).json({ msg: "user already exists" });
    }

    password = await bcrypt.hash(password, saltRounds);

    await UserModel.create({
      userName,
      email,
      fullName,
      password,
      avatar,
    });

    res.json({ msg: "user created" });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

User.forgotPassword = async (req, res) => {
  try {
    let { otp, password, userName } = req.body;

    if (otp != 1234) {
      return res.status(401).json({ msg: "wrong otp" });
    }

    password = await bcrypt.hash(password, saltRounds);

    await UserModel.findOneAndUpdate({ userName }, { password });

    res.json({ msg: "password reset" });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

User.updatePassword = async (req, res) => {
  try {
    let { currentPassword, newPassword, userName } = req.body;

    let user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(404).json({ msg: "no user found" });
    }

    let isPassCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isPassCorrect) {
      return res.status(401).json({ msg: "wrong password" });
    }

    let password = await bcrypt.hash(newPassword, saltRounds);

    await UserModel.findOneAndUpdate({ userName }, { password });

    res.json({ msg: "password updated" });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

User.updateProfile = async (req, res) => {
  try {
    let { userName, fullName, avatar } = req.body;

    let user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(404).json({ msg: "no user found" });
    }

    let obj = {};

    if (fullName) {
      obj = {
        fullName,
      };
    }
    if (avatar) {
      obj = {
        ...obj,
        avatar,
      };
    }

    await UserModel.findOneAndUpdate({ userName }, obj);

    res.json({ msg: "profile updated" });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = User;
