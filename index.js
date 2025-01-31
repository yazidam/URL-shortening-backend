const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");
dotenv.config();
app.use(cors());

app.use(express.json());
app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  const connectDB = require("./config/db");
  connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT} 😆`));
}


module.exports = app;  // Export the app instance