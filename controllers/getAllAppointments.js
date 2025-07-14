const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
} = require("../constants/httpStatusCodes");
const Appointments = require("../models/appointments");

module.exports.getAllAppointments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "appointments.day";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    const appointments = await Appointments.find()
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(STATUS_OK).send({ appointments });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error });
  }
};
