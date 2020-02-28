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
            console.log(steamUser.data.response.players[0]);

            // Checking to see if any user was returned
            if (player) {
                // Getting the users steam level
                const steamLvl = await axios.get("https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key="
                    + process.env.STEAM_KEY + "&steamid=" + id);
                const recentGames = await axios.get("https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key="
                    + process.env.STEAM_KEY + "&steamid=" + id + "&count=" + 3);
                const ownedGames = await axios.get("https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key="
                    + process.env.STEAM_KEY + "&steamid=" + id);

                // Setting necessary fields to information
                newUser.steamid = player.steamid;
                newUser.profileurl = "https://steamcommunity.com/profiles/" + player.steamid;
                newUser.avatar = player.avatarfull;
                newUser.communityvisibilitystate = player.communityvisibilitystate;
                newUser.personaname = player.personaname;
                newUser.steam_level = steamLvl.data.response.player_level;
                newUser.games = recentGames.data.response.games;
                newUser.game_count = ownedGames.data.response.game_count;

                // Checking to see if the friends list will be visible in the api
                if (newUser.communityvisibilitystate === 3) {
                    const friendList = await axios.get("https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key="
                        + process.env.STEAM_KEY + "&steamid=" + id);
                    newUser.friend_count = friendList.data.friendslist.friends.length
                } else {
                    newUser.friend_count = "Not public";
                }

                // Checking to see if the user should be created or updated
                if (found) {
                    console.log("updated")
                    newUser.views = found.views + 1;
                    newUser.last_updated = Date.now();
                    const updated = db.Users.findOneAndUpdate({ steamid: found.steamid }, newUser, { new: true })
                    return resolve(updated);
                } else {
                    console.log("created");
                    newUser.views = 1;
                    const created = db.Users.create(newUser)
                    return resolve(created);
                }
            } else {
                // If a player is not returned then it is considered a failure and a status stating so is returned
                return resolve({ status: "Invalid SteamID" });
            }
        });
    },
    getTopViews: function () {
        return new Promise(async (resolve) => {

            const found = await db.Users.find({}, {
                personaname: 1,
                steamid: 1,
                views: 1,
                profileurl: 1,
                _id: 0
            })
                .sort({ views: -1 })
                .limit(10);

            return resolve(found);
        });
    }
}