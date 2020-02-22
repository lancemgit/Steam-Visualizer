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
        return new Promise((resolve) => {
            db.Users.findOne({ steamid: id }).then(async function (found) {
                // Checking to see if a user has been found
                if (found) {
                    // If a user has been found then a date is set to compare
                    const userDate = new Date(found.last_updated).getTime();
                    if (!force && !compareTimeDay(userDate)) {
                        // Updating the found users view count
                        let updatedUser = found;
                        updatedUser.views = updatedUser.views + 1;
                        db.Users.findOneAndUpdate({ steamid: found.steamid }, updatedUser, { new: true })
                            .then(function (updated) {
                                resolve(updated);
                            });
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
                    newUser.last_updated = Date.now();
                    newUser.steam_level = steamLvl.data.response.player_level;
                    newUser.games = recentGames.data.response.games;

                    // Checking to see if the user should be created or updated
                    if (found) {
                        newUser.views = found.views + 1;
                        db.Users.findOneAndUpdate({ steamid: found.steamid }, newUser, { new: true })
                            .then(function (updated) {
                                resolve(updated);
                            });
                    } else {
                        newUser.views = 0;
                        db.Users.create(newUser)
                            .then(function (created) {
                                resolve(created);
                            });
                    }
                } else {
                    // If a player is not returned then it is considered a failure
                    resolve({ status: 404, reason: "Invalid SteamID" });
                }
            });
        });
    },
}