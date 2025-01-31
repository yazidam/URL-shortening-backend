const request = require("supertest");
const mongoose = require("mongoose");
const Url = require("../models/urlSchema"); // Make sure your schema is correct
const app = require("../index"); // Make sure this imports the express app

// Mock database connection before tests
beforeAll(async () => {
  const url = process.env.MONGO_URI || "mongodb://localhost/test_database"; // Ensure this is set correctly
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear the test database before each test
beforeEach(async () => {
  await Url.deleteMany({});
});

// Close the database connection after tests
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
  it("should return error message for an invalid URL", async () => {
    const response = await request(app)
      .post("/shorten")
      .send({ originalUrl: "invalid-url" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Invalid URL");
  });

  it("should return error message when no URL is provided", async () => {
    const response = await request(app).post("/shorten").send({});

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Invalid URL");
  });
});

describe("GET /:shortUrl", () => {
  it("should return 404 for non-existent short URL", async () => {
    const response = await request(app).get("/nonexistentShortUrl").expect(404);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("URL not found");
  });
});
