const express = require("express");
const router = express.Router();

const contactRouter = require("./contacts.route");

// Routes
router.use("/contacts", contactRouter);

module.exports = router;
