const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./database/db");
const router = require("./router/router");
const cookieParser = require("cookie-parser");

const app = express();

const port = process.env.PORT || 5000;

db.connect();

dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/admin", router);

app.get("/", (req, res) => {
  res.send("Nodejs backend is running....");
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
