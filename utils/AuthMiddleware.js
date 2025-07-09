require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET || "jwt_secret_key",
    async (err, data) => {
      if (err) {
        return res.json({ status: false });
      } else {
        const user = await User.findById(data.id);
        if (user) return res.json({ status: true, username: user.username });
        else return res.json({ status: false });
      }
    }
  );
};
