const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} = require("../constants/httpStatusCodes");
const Appointments = require("../models/appointments");
const Website = require("../models/website");

module.exports.getAppointmentByWebsiteId = async (req, res) => {
  try {
    const websiteId = req.params.websiteId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "appointments.day";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    const websiteExists = await Website.findById(websiteId);

    if (!websiteExists) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Website not found with this websiteId" });
    }

    const appointments = await Appointments.find({ websiteId })
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(STATUS_OK).json({ appointments });
  } catch (error) {
    return res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Something went wrong" });
  }
};
