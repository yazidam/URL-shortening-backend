const express = require("express");
const {
  shortenUrl,
  redirectUrl,
  getAllUrls,
} = require("../controllers/urlController");

const router = express.Router();
router.get("/urls", getAllUrls);
router.post("/shorten", shortenUrl);
router.get("/:shortUrl", redirectUrl);
module.exports = router;
