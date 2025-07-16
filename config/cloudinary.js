require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dtxjezdnn",
  api_key: "853821393776432",
  api_secret: "i61vCIkaTnOR791jmUMN69fBwOM",
});

module.exports = { cloudinary };


