const router = require("express").Router();
const userController = require("../../controllers/userController");
const gameController = require("../../controllers/gameController");

// Matches with "/api/user"

router.get("", async function (req, res) {
  const id = req.body.id;
  res.json(await userController.getUser(id, true));
});

module.exports = router;
