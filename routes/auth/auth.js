const router = require("express").Router();

// Matches with "/auth"
router.get("/test", function (req, res) {
    res.json({ something2: "something3" });
})

module.exports = router;
