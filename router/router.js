const express = require("express");
const { Signup, SignIn } = require("../controllers/AuthController");
const { userVerification } = require("../utils/AuthMiddleware");

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", SignIn);

router.get("/", userVerification);

module.exports = router;
