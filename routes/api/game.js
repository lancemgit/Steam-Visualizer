const router = require("express").Router();

// Matches with "/api/game"
router.get("/test", function (req, res) {
    res.json({ something2: "something2" });
})

module.exports = router;
