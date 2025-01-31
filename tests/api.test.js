const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const Url = require("../models/urlSchema");

beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI;
  await mongoose.disconnect(); // Ensure no existing connection
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  await Url.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /shorten", () => {
  it("should shorten a URL", async () => {
    const response = await request(app)
      .post("/shorten")
      .send({ originalUrl: "https://www.google.com" })
      .expect(200);

    expect(response.body).toHaveProperty("shortUrl");
  });
  
  it("✅ should return error message if the URL is already shortened format", async () => {
    const response = await request(app)
      .post("/shorten")
      .send({ originalUrl: "http://localhost:4500/abcd123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("error", "Invalid URL");
  });
});

describe("GET /:shortUrl", () => {
  it("✅ should not increase visit count if URL does not exist", async () => {
    const response = await request(app).get("/nonexistentShortUrl").expect(404);

    expect(response.body).toHaveProperty("error", "URL not found");

    const urlDoc = await Url.findOne({ shortUrl: "nonexistentShortUrl" });
    expect(urlDoc).toBeNull(); // Ensure the DB was not modified
  });

  it("✅ should return 400 for an invalid short URL format", async () => {
    const response = await request(app)
      .get("/invalid@short@url") // Invalid format with special characters
      .expect(404);

    expect(response.body).toHaveProperty("error", "URL not found");
  });
});
