const db = require("../models");
const compareTimeDay = require("./helperFunctions").compareTimeDay;
const axios = require("axios");

module.exports = {
    // This is where the database calls will be in object format

    // Get a game based on if 1 week has passed since the last time it was called from the api,
    // have a parameter called force to force call the api bypassing the 1 week restriction
    // Return the object or promise with the object with the data

    // Get multiple games and if they are not there than add them to the database
    // Accepts array of gameids
    // Return array of objects

    getGames: function (appids, force) {
        return new Promise(async (resolve) => {
            let returnedGames = [];
            for (let i = 0; i < appids.length; i++) {
                const found = await db.Games.findOne({ appid: appids[i] });
                if (found) {
                    if (compareTimeDay(found.last_updated) && !force) {
                        console.log("found")
                        returnedGames.push(found);
                        continue;
                    }
                }

                let newGame = {};
                const steamApiInfo = await axios.get("https://store.steampowered.com/api/appdetails?appids=" + appids[i]);
                const currentGameApi = steamApiInfo.data[appids[i]];
                const success = currentGameApi.success;

                if (!success) {
                    returnedGames.push({ appid: "invalid appid" });
                } else {
                    const steamSpyInfo = await axios.get("https://steamspy.com/api.php?request=appdetails&appid=" + appids[i]);
                    const currentGameSpy = steamSpyInfo.data;

                    // Setting relevant data to newGame object
                    newGame.appid = currentGameApi.data.steam_appid;
                    newGame.title = currentGameApi.data.title;
                    newGame.short_description = currentGameApi.data.short_description;
                    newGame.header_image = currentGameApi.data.header_image;
                    newGame.release_date = currentGameApi.data.release_date.date;
                    newGame.developer = currentGameSpy.developer;
                    newGame.publisher = currentGameSpy.publisher;
                    newGame.positive = currentGameSpy.positive;
                    newGame.negative = currentGameSpy.negative;
                    newGame.owners = currentGameSpy.owners;
                    newGame.average_forever = currentGameSpy.average_forever;
                    newGame.average_2weeks = currentGameSpy.average_2weeks;
                    newGame.ccu = currentGameSpy.ccu;
                    newGame.genre = currentGameSpy.genre;

                    if (found) {
                        newGame.last_updated = Date.now();
                        const updated = await db.Games.findOneAndUpdate({ appid: found.appid }, newGame, { new: true })
                        returnedGames.push(updated);
                        console.log("updated")
                        continue;

                    } else {
                        const created = await db.Games.create(newGame)
                        console.log("created")
                        returnedGames.push(created);
                        continue;
                    }
                }
            }
            return resolve(returnedGames);
        });
    }
}