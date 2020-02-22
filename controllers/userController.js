const db = require("../models");
const axios = require("axios");
const compareTimeDay = require("./helperFunctions").compareTimeDay;

module.exports = {
    // Return results in object
    // Get recent games of user
    // Get all game data for a user
    // Get badges data, and more for a user
    // This will also grab steam level

    getUserData: function (id, force) {
        return new Promise(async (resolve) => {
            const found = await db.Users.findOne({ steamid: id });
            // Checking to see if a user has been found
            if (found) {
                // If a user has been found then a date is set to compare
                if (compareTimeDay(found.last_updated) && !force) {
                    // Updating the found users view count
                    let tempUser = found;
                    tempUser.views = tempUser.views + 1;
                    console.log("found");
                    const updated = db.Users.findOneAndUpdate({ steamid: found.steamid }, tempUser, { new: true })
                    return resolve(updated);
                }
            }
            // Setting a newUser variable to push into db later on
            let newUser = {};
            // Getting the data of a specific user from the steam api
            const steamUser = await axios.get("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="
                + process.env.STEAM_KEY + "&steamids=" + id);
            const player = steamUser.data.response.players[0];

            // Checking to see if any user was returned
            if (player) {
                // Getting the users steam level
                const steamLvl = await axios.get("https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key="
                    + process.env.STEAM_KEY + "&steamid=" + id);
                const recentGames = await axios.get("https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key="
                    + process.env.STEAM_KEY + "&steamid=" + id + "&count=" + 3);

                // Setting necessary fields to information
                newUser.steamid = player.steamid;
                newUser.profileurl = "https://steamcommunity.com/profiles/" + player.steamid;
                newUser.avatar = player.avatar;
                newUser.communityvisibilitystate = player.communityvisibilitystate;
                newUser.personaname = player.personaname;
                newUser.steam_level = steamLvl.data.response.player_level;
                newUser.games = recentGames.data.response.games;

                // Checking to see if the user should be created or updated
                if (found) {
                    console.log("updated")
                    newUser.views = found.views + 1;
                    newUser.last_updated = Date.now();
                    const updated = db.Users.findOneAndUpdate({ steamid: found.steamid }, newUser, { new: true })
                    return resolve(updated);
                } else {
                    console.log("created");
                    newUser.views = 0;
                    const created = db.Users.create(newUser)
                    return resolve(created);
                }
            } else {
                // If a player is not returned then it is considered a failure
                return resolve({ status: 404, reason: "Invalid SteamID" });
            }
        });

    },
}