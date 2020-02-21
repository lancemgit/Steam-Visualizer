const db = require("../models");
const axios = require("axios");
const compareTimeDay = require("./helperFunctions").compareTimeDay;

module.exports = {
    // This is where the database calls will be
    // Return results in object

    // Get recent games of user

    // Get all game data for a user

    // Get badges data, and more for a user
    // https://partner.steamgames.com/doc/webapi/IPlayerService#GetBadges


    // Get achievements for a certain user and appid
    // Returns array of objects

    // This will also grab steam level
    getUser: function (id, force) {
        return new Promise(resolve => {
            db.Users.findOne({ steamid: id }).then(function (found) {
                // Checking to see if a user has been found
                if (found) {
                    // If a user has been found then a date is set to compare
                    const userDate = new Date(found.last_updated).getTime();
                    if (!force && compareTimeDay(userDate)) {
                        resolve(found);
                    }
                }
                // Setting a newUser variable to push into db later on
                let newUser = {};
                axios.get("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="
                    + process.env.STEAM_KEY + "&steamids=" + id)
                    .then(function (res) {
                        const player = res.data.response.players[0];
                        // Checking to see if any user was returned
                        if (player) {
                            // Setting necessary fields to information
                            newUser.steamid = player.steamid;
                            newUser.profileUrl = "https://steamcommunity.com/profiles/" + player.steamid;
                            newUser.avatar = player.avatar;
                            newUser.communityvisibilitystate = player.communityvisibilitystate;
                            newUser.personaname = player.personaname;
                            newUser.last_updated = Date.now();
                            newUser.views = 0;

                            // Getting the users steam level
                            axios.get("https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key="
                                + process.env.STEAM_KEY + "&steamid=" + id)
                                .then(function (res) {
                                    newUser.steam_level = res.data.response.player_level;
                                    if (found) {
                                        db.Users.findOneAndUpdate({ steamid: found.steamid }, newUser, { new: true }).then(function (updated) {
                                            resolve(updated);
                                        });
                                    } else {
                                        db.Users.create(newUser).then(function (created) {
                                            // Resolving the promise with the user that was just created
                                            resolve(created);
                                        });
                                    }
                                });
                        } else {
                            // If a player is not returned then it is considered a failure
                            resolve({ status: false, reason: "Invalid SteamID" });
                        }
                    });
            });
        });
    },
    getRecentGames: function (id) {

    },
}