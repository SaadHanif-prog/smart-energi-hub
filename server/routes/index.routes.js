const express = require("express");
const router = express.Router();

const contactRouter = require("./contacts.route");
const materialProfileRouter = require("./material-profile.route");

// Routes
router.use("/contacts", contactRouter);
router.use("/material-profiles", materialProfileRouter);

module.exports = router;
