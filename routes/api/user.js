const router = require("express").Router();
const userController = require("../../controllers/userController");
const gameController = require("../../controllers/gameController");

// Matches with "/api/user"

router.get("/", async function (req, res) {
  // Checking to see if a user ID was provided
  if (!req.query.id) {
    return res.json({ status: "Invalid SteamID" });
  }
  // Checking to see if a force variable was provided
  // If it was now then it is set to false
  if (!req.query.force) {
    req.body.force = false;
  }

  let userData = await userController.getUserData(req.query.id, req.query.force);
  // Adding all the games from the users data into an array to get the information about the game later
  let gameArr = [];
  for (let i = 0; i < userData.games.length; i++) {
    gameArr.push(userData.games[i].appid);
  }
  // Passing through an array of appids to get the pics and name of the game.
  let namePics = await gameController.getGames(gameArr, false);

  const result = {
    user: userData,
    gameInfo: namePics
  };

  res.json(result);
});

router.get("/views", async function (req, res) {
  res.json(await userController.getTopViews());
});

module.exports = router;