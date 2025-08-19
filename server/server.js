// Main Packages
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Configurations
const CONNECT_DATABASE = require("./config/db-connect");
const getCorsOptions = require("./config/cors-config");

//Routes
const router = require("./routes/index.routes");

// Error Handler
const { handleGeneralErrors } = require("./utils/error-handlers");

/*********************************************** Imports On Top ***********************************************/

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors(getCorsOptions()));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/v1", router);

// 404 handler
app.use((_, res) => {
  res
    .status(404)
    .json({ success: false, message: "Route not found", data: null });
});

// General error handler
app.use(handleGeneralErrors);

const startServer = async () => {
  await CONNECT_DATABASE();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
