const router = require("express").Router();
const userController = require("../../controllers/userController");
const gameController = require("../../controllers/gameController");

// Matches with "/api/user"

router.get("/", async function (req, res) {
  // Checking to see if a user ID was provided
  console.log(req.query)
  if (!req.query.id) {
    return res.json({ status: "Invalid SteamID" });
  }
  // Checking to see if a force variable was provided
  // If it was now then it is set to false
  if (!req.query.force) {
    req.query.force = false;
  }

  let userData = await userController.getUserData(req.query.id, req.query.force);
  if (userData.status === "Invalid SteamID" || !userData.games) {
    return res.json({ user: userData });
  }

  // Adding all the games from the users data into an array to get the information about the game later
  for (let i = 0; i < userData.games.length; i++) {
    gameArr.push(userData.games[i].appid);
  }
  // Passing through an array of appids to get the pics and name of the game.
  let namePics = await gameController.getGames(gameArr, false);

  const result = {
    user: userData,
    gameInfo: namePics
  };

  return res.json(result);
});

router.get("/views", async function (req, res) {
  return res.json(await userController.getTopViews());
});

module.exports = router;