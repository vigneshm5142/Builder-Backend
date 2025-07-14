const mongoose = require("mongoose");

const WebsiteSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Website = mongoose.model("Website", WebsiteSchema);
module.exports = Website;
