const router = require("express").Router();
const userRoutes = require("./user");
const gameRoutes = require("./game");

// User routes
router.use("/user", userRoutes);
router.use("/game", gameRoutes);

module.exports = router;