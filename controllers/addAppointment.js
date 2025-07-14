const {
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
  STATUS_CREATED,
} = require("../constants/httpStatusCodes");
const Appointments = require("../models/appointments");
const Website = require("../models/website");

module.exports.AddAppointment = async (req, res) => {
  try {
    const websiteId = req.params.websiteId;
    const { name, email, phone, day, time } = req.body;

    const websiteExists = await Website.findOne({ _id: websiteId });

    if (!websiteExists) {
      res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Website not found with this websiteId" });
    }

    const userAppointment = await Appointments.findOne({ email, websiteId });

    if (userAppointment) {
      userAppointment.appointments.push({ day, time });

      await userAppointment.save();

      return res.status(STATUS_OK).json({
        message: "Appointment added to existing user.",
        data: userAppointment,
      });
    } else {
      const newAppointment = new Appointments({
        websiteId,
        name,
        phone,
        email,
        appointments: [{ day, time }],
      });

      await newAppointment.save();

      return res.status(STATUS_CREATED).json({
        message: "New appointment created.",
        data: newAppointment,
      });
    }
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: error });
  }
};
