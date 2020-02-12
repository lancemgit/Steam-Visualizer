const router = require("express").Router();
const authRoutes = require("./auth");

// Auth routes
router.use(authRoutes);

module.exports = router;
