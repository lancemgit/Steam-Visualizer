const passport = require("passport");
const SteamStrategy = require("passport-steam");

const urlReturn = process.env.API_APP_REALM + "/auth/steam/return";
const realm = process.env.API_APP_REALM

const strategyOptions = {
    returnURL: urlReturn,
    realm: realm,
    apiKey: process.env.STEAM_KEY
}

module.exports = app => {

    passport.use(new SteamStrategy(strategyOptions,
        async (identifier, profile, done) => {
            console.log("=================================\nHitting Steam Strategy");
            profile.identifier = identifier;
            // Setting what the payload for the jwt is going to be
            const user = {
                id: profile._json.steamid,
                name: profile._json.personaname,
                avatar: profile._json.avatar
            };
            return done(null, user);
        }));

    app.use(passport.initialize());
};

