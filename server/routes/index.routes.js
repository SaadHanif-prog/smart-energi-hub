const express = require("express");
const router = express.Router();

const contactRouter = require("./contacts.route");
const materialProfileRouter = require("./material-profile.route");
const propertiesRouter = require("./properties.route");
const projectsRouter = require("./projects.route");
const leadRouter = require("./leads.route");

// Routes
router.use("/contacts", contactRouter);
router.use("/material-profiles", materialProfileRouter);
router.use("/properties", propertiesRouter);
router.use("/projects", projectsRouter);
router.use("/leads", leadRouter);

module.exports = router;
