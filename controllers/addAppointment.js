const {
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
  STATUS_CREATED,
} = require("../constants/httpStatusCodes");
const Appointments = require("../models/appointments");

module.exports.AddAppointment = async (req, res) => {
  try {
    const { name, email, phone, day, time, dentistName } = req.body;

    const newAppointment = new Appointments({
      name,
      phone,
      email,
      day,
      time,
      dentistName,
      status: "pending",
    });

    await newAppointment.save();

    return res.status(STATUS_CREATED).json({
      message: "New appointment created.",
      data: newAppointment,
    });
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error });
  }
};
