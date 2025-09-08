const express = require("express");
const router = express.Router();

const contactRouter = require("./contacts.route");
const materialProfileRouter = require("./material-profile.route");
const propertiesRouter = require("./properties.route");
const projectsRouter = require("./projects.route");
const leadRouter = require("./leads.route");
const jobRouter = require("./jobs.route");
const subContractorRouter = require("./sub-contractor.route");
const authRouter = require("./auth.route")

const authMiddleware = require("../middlewares/auth.middleware")

// Routes
router.use("/auth", authRouter);

// router.use(authMiddleware)
router.use("/contacts", contactRouter);
router.use("/material-profiles", materialProfileRouter);
router.use("/properties", propertiesRouter);
router.use("/projects", projectsRouter);
router.use("/leads", leadRouter);
router.use("/jobs", jobRouter);
router.use("/sub-contractor", subContractorRouter);


module.exports = router;
