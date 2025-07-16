const { cloudinary } = require("../config/cloudinary");
const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
} = require("../constants/httpStatusCodes");
const Media = require("../models/medai");
require("dotenv").config();

module.exports.uploadImageOrVideo = async (req, res) => {



  try {
    const { media, fileType } = req.body;

    if (!media || !fileType) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Media and file type are required" });
    }
console.log("###",process.env.CLOUDINARY_PRESET_NAME);
console.log("###fileTyp",fileType);

    const mediaResponse = await cloudinary.uploader.upload(media, {
      upload_preset: process.env.CLOUDINARY_PRESET_NAME,
      resource_type: fileType,
      public_id: `${Date.now()}_additional`,
      
    });

    console.log("mediaResponse", mediaResponse);
    
    if (mediaResponse.secure_url) {
      await Media.create({ url: mediaResponse.secure_url, mediaType: fileType });
      res.status(STATUS_CREATED).json({
        message: `${fileType} uploaded`,
        image: mediaResponse.secure_url,
      });
    } else {
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: "Upload failed" });
    }
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error });
  }
};
