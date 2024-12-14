//libraries used
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//file imports
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Database connection
connectDB();

// Routes
app.use("/api", authRoutes);
app.use("/api", profileRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
