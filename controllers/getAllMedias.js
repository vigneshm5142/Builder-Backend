const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
} = require("../constants/httpStatusCodes");
const Media = require("../models/medai");

module.exports.getAllMedias = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    const medias = await Media.find()
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(STATUS_OK).json({ medias });
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Internal server error" });
  }
};
