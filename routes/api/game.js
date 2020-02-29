const router = require("express").Router();
const gameController = require("../../controllers/gameController");

// Matches with "/api/game"
router.put("", async function (req, res) {
    if (!req.body.appids || req.body.appids.length > 3) {
        return res.json({ status: "Invalid AppID Format" });
    }

    if (!req.body.force) {
        req.body.force = false;
    }

    return res.json(await gameController.getGames(req.body.appids, req.body.force));
});

module.exports = router;