const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./router/router");
const db = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();

const port = process.env.PORT || 5000;

db.connect();

dotenv.config();

// Middlewares
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:7071"
        : process.env.WEBSITE_LIVE_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Routes
app.use("/api/v1/admin", router);

app.get("/", (req, res) => {
  res.send("Nodejs backend is running....");
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
