const router = require("express").Router();

// Matches with "/api/user"
router.get("/test", function (req, res) {
  res.json({ something: "something" });
})

module.exports = router;
