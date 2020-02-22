const router = require("express").Router();
const userController = require("../../controllers/userController");
const gameController = require("../../controllers/gameController");

// Matches with "/api/user"

router.get("", async function (req, res) {
  res.json(await userController.getUserData(req.body.id, req.body.force));
});

router.get("/views", async function (req, res) {
  res.json(await userController.getTopViews());
});

module.exports = router;
