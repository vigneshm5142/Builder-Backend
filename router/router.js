const express = require("express");
const { Signup, SignIn } = require("../controllers/AuthController");
const { userVerification } = require("../utils/AuthMiddleware");
const { AddAppointment } = require("../controllers/addAppointment");
const { getAllAppointments } = require("../controllers/getAllAppointments");
const {
  getAppointmentByWebsiteId,
} = require("../controllers/getAppointmentByWebsiteId");
const { uploadImageOrVideo } = require("../controllers/uploadImageOrVideo");
const { getAllMedias } = require("../controllers/getAllMedias");

const router = express.Router();

// Authentications
router.post("/signup", Signup);
router.post("/signin", SignIn);
router.get("/", userVerification);

// Appointment related routes
router.post("/appointment", AddAppointment);
router.get("/appointments", getAllAppointments);
router.get("/appointments/:websiteId", getAppointmentByWebsiteId);

router.post("/media/upload", uploadImageOrVideo);
router.get("/medias", getAllMedias);

module.exports = router;
