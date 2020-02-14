const passport = require("passport");
const SteamStrategy = require("passport-steam");

const strategyOptions = {
    returnURL: `http://localhost:3001/auth/steam/return`,
    realm: "http://localhost:3001",
    apiKey: process.env.STEAM_KEY
}

module.exports = app => {

    passport.use(new SteamStrategy(strategyOptions,
        async (identifier, profile, done) => {
            console.log("In strategy settings");
            console.log(identifier);
            console.log(profile);
            profile.identifier = identifier;

            return (null, profile);
        }));

    app.use(passport.initialize());

};

