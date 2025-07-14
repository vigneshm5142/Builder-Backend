const mongoose = require("mongoose");

const AppointmentEntrySchema = new mongoose.Schema({
  day: { type: Date, required: true },
  time: { type: String, required: true },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
});

const AppointmentSchema = new mongoose.Schema({
  websiteId: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  appointments: [AppointmentEntrySchema],
});

const Appointments = mongoose.model("Appointments", AppointmentSchema);
module.exports = Appointments;
