require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "jwt_secret_key", {
    expiresIn: 30 * 24 * 60 * 60,
  });
};
