const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  day: { type: Date, required: true },
  time: { type: String, required: true },
  dentistName: { type: String, required: true },
  status: { type: String },
});

const Appointments = mongoose.model("Appointments", AppointmentSchema);
module.exports = Appointments;
