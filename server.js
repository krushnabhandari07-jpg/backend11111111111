const express = require("express");
const app = express();
const mongoose = require("mongoose");
PORT = 5000

// Middleware to parse JSON
app.use(express.json());



// MongoDB Atlas connection string
const mongoURI = "mongodb+srv://krushnabhandari:krushna123456@cluster0.5swywik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Test route (GET /)
app.get("/", (req, res) => {
  res.send("🚀 API is working fine");
});

// Mount user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

//mount auth routes
const authRoutes = require("./routes/auth");
app.use("/api",authRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});