const router = require("express").Router();
const gameController = require("../../controllers/gameController");

// Matches with "/api/game"
router.get("", async function (req, res) {
    res.json(await gameController.getGames(req.body.appids, req.body.force));
});

module.exports = router;