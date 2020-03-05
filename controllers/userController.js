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
                const gameList = await this.getAmountPlayed(id);

                // Setting necessary fields to information
                newUser.steamid = player.steamid;
                newUser.profileurl = "https://steamcommunity.com/profiles/" + player.steamid;
                newUser.avatar = player.avatarfull;
                newUser.communityvisibilitystate = player.communityvisibilitystate;
                newUser.personaname = player.personaname;
                newUser.steam_level = steamLvl.data.response.player_level;
                newUser.game_count = gameList.gameCount;
                newUser.no_time = gameList.noTime;
                newUser.one_hour = gameList.oneHour;
                newUser.above_one = gameList.aboveOneHour;

                if (recentGames.data.response.games) {
                    newUser.games = recentGames.data.response.games;
                } else {
                    newUser.games = null;
                }

                // Checking to see if the friends list will be visible in the api
                try {
                    const friendList = await axios.get("https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key="
                        + process.env.STEAM_KEY + "&steamid=" + id);
                    newUser.friend_count = friendList.data.friendslist.friends.length;
                } catch (err) {
                    newUser.friend_count = "Not Available";
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
    },
    getUserGame: function (id, gameid) {
        return new Promise(async (resolve) => {
            await axios.get("https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=" + process.env.STEAM_KEY
                + "&steamid=" + id).then(function (res) {
                    const gameList = res.data.response.games;
                    // Looping through the objects of objects and checking if the given gameid is given
                    for (let i = 0; i < gameList.length; i++) {
                        if (gameList[i].appid === Number(gameid)) {
                            return resolve({ user_playtime_forever: gameList[i].playtime_forever });
                        }
                    }
                    // If it is not owned then the a status saying that is given
                    return resolve({ status: "Not Owned" })

                }).catch(function (err) {
                    // If any error occurs from the api call then the steamID is bad
                    return resolve({ status: "Invalid SteamID" });
                });
        });
    },
    getAmountPlayed: function (id) {
        return new Promise(async (resolve) => {
            await axios.get("https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=" + process.env.STEAM_KEY
                + "&steamid=" + id).then(function (res) {
                    const gameList = res.data.response.games;
                    let data = {
                        noTime: 0,
                        oneHour: 0,
                        aboveOneHour: 0,
                        gameCount: res.data.response.game_count
                    }
                    // Looping through the objects of objects and checking if the given gameid is given
                    for (let i = 0; i < gameList.length; i++) {
                        if (gameList[i].playtime_forever === 0) {
                            data.noTime++
                        } else if (gameList[i].playtime_forever > 0 && gameList[i].playtime_forever <= 60) {
                            data.oneHour++
                        } else {
                            data.aboveOneHour++
                        }
                    }

                    return resolve(data);

                }).catch(function (err) {
                    // If any error occurs from the api call then the steamID is bad
                    return resolve({ status: "Invalid SteamID" });
                });
        });
    }
}