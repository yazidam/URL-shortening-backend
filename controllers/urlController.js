const shortid = require("shortid");
const Url = require("../models/urlSchema");

// Function to shorten a URL
exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    // Validate URL format
    const urlRegex = new RegExp(
      "^" +
        // Protocol (required)
        "https?://" +
        // Domain name
        "(?:" +
        // Optional www
        "(?:www\\.)?" +
        // Domain labels: Can't start/end with hyphen or number
        "[a-zA-Z](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?" +
        "\\." +
        // Second level domain: Can't start/end with hyphen or number
        "[a-zA-Z](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?" +
        // TLD
        "\\.(?:com|net|org|edu|gov|mil|biz|info|io|co|uk|us|ca|de|jp|fr|au|ru|ch|it|nl|se|no|es|me)" +
        ")" +
        // Port number (optional)
        "(?::\\d{2,5})?" +
        // Path (optional)
        "(?:/[a-zA-Z0-9-._~:/?#\\[\\]@!$&'()*+,;=]*)?" +
        "$"
    );
    if (!urlRegex.test(originalUrl)) {
      return res.json({ error: "Invalid URL" });
    }

    // Check if URL already exists
    let existingUrl = await Url.findOne({ originalUrl });

    if (existingUrl) {
      return res.json({
        shortUrl: ``,
        msg: "URL already exists",
      });
    }

    // Generate short URL and save to database
    const shortUrl = shortid.generate();
    const newUrl = new Url({ originalUrl, shortUrl });
    await newUrl.save();

    res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortUrl}` });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Function to handle redirection
exports.redirectUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Increment visit count (if you want to track how many times the short URL is accessed)
    url.visits += 1;
    await url.save();

    // Redirect to the original URL
    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Error redirecting to the URL" });
  }
};

exports.getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find(); // Fetch all URLs from the database
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: "Error fetching URLs" });
  }
};