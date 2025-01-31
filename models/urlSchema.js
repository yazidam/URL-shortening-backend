const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  visits: { type: Number, default: 0 },
});

module.exports = mongoose.model("Url", UrlSchema);
