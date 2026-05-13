require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in .env file ❌");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 🎉");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error ❌:", err.message);
  });

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ✅`);
});