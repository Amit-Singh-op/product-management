require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;


// Use CORS middleware
app.use(cors());

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", productRoutes);
//

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
