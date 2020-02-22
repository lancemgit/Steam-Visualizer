const router = require("express").Router();
const gameController = require("../../controllers/gameController");

// Matches with "/api/game"
router.get("/test", function (req, res) {
    res.json({ something2: "something2" });
});

router.get("", async function (req, res) {
    res.json(await gameController.getGames([1141160, 1112620, 600090], false));
});

module.exports = router;
